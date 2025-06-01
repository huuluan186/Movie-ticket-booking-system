import db from '../models';
import { Op } from 'sequelize';
import {nanoid} from 'nanoid'
import moment from 'moment';
import { isTimeRangeValid, checkTimeConflict, checkExistence,
    getCinemaIdsByCluster,groupShowtimesByDate,getUniqueMovies,
    getShowtimes
} from '../utils/showtimeHelpers';


export const createShowtimesService = ({ showtime_date, showtime_starttime, showtime_endtime, price, movie_id, cinema_id }) => new Promise(async (resolve, reject) => {
    try {
        // 1. Kiểm tra movie_id có tồn tại không và lấy duration
        const movie = await checkExistence(db.Movie, 'movie_id', movie_id);
        if (!movie) {
            return resolve({
                err: 1,
                msg: 'Phim không tồn tại.'
            });
        }
        const duration = movie.duration; 

        // 2. Kiểm tra thời gian có hợp lệ không
        const timeCheck = isTimeRangeValid(showtime_date, showtime_starttime, showtime_endtime, duration);
        if (!timeCheck.valid) {
            return resolve({
                err: 1,
                msg: timeCheck.msg
            });
        }

        // Cập nhật showtime_starttime và showtime_endtime nếu không được cung cấp
        const finalStartTime = showtime_starttime || timeCheck.startTime;
        const finalEndTime = showtime_endtime || timeCheck.endTime;

        // 3. Kiểm tra cinema_id có tồn tại không
        const cinemaExists = await checkExistence(db.Cinema, 'cinema_id', cinema_id);
        if (!cinemaExists) {
            return resolve({
                err: 1,
                msg: 'Phòng chiếu không tồn tại.'
            });
        }

        // 4. Kiểm tra trùng suất chiếu
        const hasConflict = await checkTimeConflict(cinema_id, showtime_date, finalStartTime, finalEndTime);
        if (hasConflict) {
            return resolve({
                err: 1,
                msg: 'Khung giờ này đã có suất chiếu khác!'
            });
        }

        // 5. Tạo suất chiếu mới
        const showtime = await db.Showtime.create({
            showtime_id: nanoid(), 
            showtime_date,
            showtime_starttime: finalStartTime,
            showtime_endtime: finalEndTime,
            price,
            movie_id,
            cinema_id
        });

        resolve({
            err: 0,
            msg: 'Tạo suất chiếu thành công!',
            response: showtime
        });

    } catch (error) {
        reject(error);
    }
});

export const getShowtimesByQueryService = (cluster_id, movie_id = null) => new Promise(async (resolve, reject) => {
  try {
    let whereCondition = {};

    if (cluster_id) {
        const clusterExists = await checkExistence(db.CinemaCluster, 'cluster_id', cluster_id);
        if (!clusterExists) {
            return resolve({
                err: 1,
                msg: 'Cụm rạp không tồn tại!',
                response: { movies: [], showtimesByDate: [] }
            });
        }

        const cinemaIds = await getCinemaIdsByCluster(cluster_id, db);
        whereCondition.cinema_id = { [Op.in]: cinemaIds };
    }

    if (movie_id) {
      whereCondition.movie_id = movie_id;
    }

    const showtimes = await getShowtimes(whereCondition, db);

    if (!showtimes || showtimes.length === 0) {
      return resolve({
        err: 1,
        msg: cluster_id ? 'Không tìm thấy suất chiếu nào cho cụm rạp này!' : 'Không tìm thấy suất chiếu nào!',
        response: { movies: [], showtimesByDate: [] }
      });
    }

    const uniqueMovies = getUniqueMovies(showtimes);
    const showtimesByDate = groupShowtimesByDate(showtimes);

    resolve({
      err: 0,
      msg: cluster_id && movie_id
            ? 'Lấy danh sách suất chiếu theo cụm rạp và phim thành công!'
            : cluster_id
            ? 'Lấy danh sách suất chiếu theo cụm rạp thành công!'
            : movie_id
            ? 'Lấy danh sách suất chiếu theo phim thành công!'
            : 'Lấy tất cả suất chiếu thành công!',
      response: { movies: uniqueMovies, showtimesByDate }
    });
  } catch (error) {
    reject({ err: 1, msg: 'Lỗi khi lấy suất chiếu: ' + error.message });
  }
});

//Lấy thông tin chi tiết suất chiếu
export const getShowtimeDetailService = (showtime_id) => new Promise(async (resolve, reject) => {
    try {
        const showtime = await db.Showtime.findOne({
        where: { showtime_id },
        include: [
            { model: db.Movie, as:'movie', attributes: ['movie_id', 'title', 'poster'] },
            { 
                model: db.Cinema, 
                as:'cinema', 
                attributes: ['cinema_id', 'cinema_name', 'cluster_id'],
                include: [
                    { 
                        model: db.CinemaCluster, 
                        as: 'cinema_cluster', 
                        attributes: ['cluster_id', 'cluster_name', 'chain_id'], 
                        include: [
                            { 
                                model: db.CinemaChain, 
                                as: 'cinema_chain', 
                                attributes: ['chain_id', 'chain_name'] }
                        ]
                    },
                ]
            }
        ],
        raw: true,
        nest: true
        });

        resolve({
            err: showtime ? 0 : 1,
            msg: showtime ? 'Lấy chi tiết suất chiếu thành công!' : 'Không tìm thấy suất chiếu nào!',
            response: showtime
        });
    } catch (error) {
        reject(error);
    }
});

// Service để xóa suất chiếu
export const deleteShowtimeService = ({ showtime_id }) => new Promise(async (resolve, reject) => {
    try {
        const showtime = await db.Showtime.findOne({
            where: { showtime_id },
            include: [{ model: db.Ticket, as: 'tickets' }]
        });

        if (!showtime) {
            return resolve({
                err: 1,
                msg: 'Suất chiếu không tồn tại.'
            });
        }

        const now = moment().tz('Asia/Ho_Chi_Minh'); // 09:30 AM +07, 25/05/2025
        const startTime = moment(`${showtime.showtime_date}T${showtime.showtime_starttime}+07:00`);
        const endTime = moment(`${showtime.showtime_date}T${showtime.showtime_endtime}+07:00`);
        const timeDelete = moment(startTime).add(45, 'minutes');

        // Kiểm tra nếu suất chiếu đã bắt đầu từ 45 phút trở lên hoặc đã kết thúc từ 45 phút trở lên
        if (now >= timeDelete || now >= endTime) {
            await showtime.destroy();
            return resolve({
                err: 0,
                msg: 'Suất chiếu đã bắt đầu quá 45 phút và được xóa thành công!'
            });
        }

        if (showtime.tickets.length > 0) {
            return resolve({
                err: 1,
                msg: 'Không thể xóa suất chiếu vì đã có vé được đặt.'
            });
        }

        await showtime.destroy();
        resolve({
            err: 0,
            msg: 'Xóa suất chiếu thành công!'
        });
    } catch (error) {
        reject(error);
    }
});

// Service để tự động xóa các suất chiếu cũ
export const autoDeleteShowtimesService = () => new Promise(async (resolve, reject) => {
    try {
        const now = moment().tz('Asia/Ho_Chi_Minh'); // 09:45 AM +07, 25/05/2025
        const showtimes = await db.Showtime.findAll({
            include: [{ model: db.Ticket, as: 'tickets' }]
        });

        let deletedCount = 0;
        for (const showtime of showtimes) {
            const startTime = moment(`${showtime.showtime_date}T${showtime.showtime_starttime}+07:00`);
            const endTime = moment(`${showtime.showtime_date}T${showtime.showtime_endtime}+07:00`);
            const timeDelete = moment(startTime).add(45, 'minutes');

            // Xóa bất kể có vé đặt hay không
            if (now >= timeDelete || now >= endTime) {
                await showtime.destroy();
                deletedCount++;
            }
        }

        resolve({
            err: 0,
            msg: `Đã xóa ${deletedCount} suất chiếu cũ thành công!`
        });
    } catch (error) {
        reject(error);
    }
});

// Service để cập nhật suất chiếu
export const updateShowtimeService = ({ showtime_id, showtime_date, showtime_starttime, showtime_endtime, price, movie_id, cinema_id }) => new Promise(async (resolve, reject) => {
    try {
        const showtime = await db.Showtime.findOne({ where: { showtime_id } });
        if (!showtime) return resolve({ err: 1, msg: 'Suất chiếu không tồn tại.' });

        const movie = movie_id ? await db.Movie.findOne({ where: { movie_id }, raw: true }) : null;
        if (movie_id && !movie) return resolve({ err: 1, msg: 'Phim không tồn tại.' });

        const cinemaExists = cinema_id ? await checkExistence(db.Cinema, 'cinema_id', cinema_id) : true;
        if (cinema_id && !cinemaExists) return resolve({ err: 1, msg: 'Phòng chiếu không tồn tại.' });

        const updatedShowtime = {
            showtime_date: showtime_date || showtime.showtime_date,
            showtime_starttime: showtime_starttime || showtime.showtime_starttime,
            showtime_endtime: showtime_endtime || showtime.showtime_endtime,
            price: price || showtime.price,
            movie_id: movie_id || showtime.movie_id,
            cinema_id: cinema_id || showtime.cinema_id
        };

        const timeCheck = isTimeRangeValid(
            updatedShowtime.showtime_date,
            updatedShowtime.showtime_starttime,
            updatedShowtime.showtime_endtime,
            movie?.duration || (await db.Movie.findOne({ where: { movie_id: showtime.movie_id }, raw: true })).duration
        );
        if (!timeCheck.valid) return resolve({ err: 1, msg: timeCheck.msg });

        const finalStartTime = timeCheck.startTime;
        const finalEndTime = timeCheck.endTime;

        const hasConflict = await checkTimeConflict(cinema_id || showtime.cinema_id, updatedShowtime.showtime_date, finalStartTime, finalEndTime, showtime_id);
        if (hasConflict) return resolve({ err: 1, msg: 'Khung giờ này đã có suất chiếu khác!' });

        await showtime.update({
            showtime_date: updatedShowtime.showtime_date,
            showtime_starttime: finalStartTime,
            showtime_endtime: finalEndTime,
            price: updatedShowtime.price,
            movie_id: updatedShowtime.movie_id,
            cinema_id: updatedShowtime.cinema_id
        });

        resolve({ err: 0, msg: 'Cập nhật suất chiếu thành công!', response: showtime });
    } catch (error) {
        reject(error);
    }
});