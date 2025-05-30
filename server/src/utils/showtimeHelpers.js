import moment from 'moment';
import { Op } from 'sequelize';
import db from '../models';

/**
 * Kiểm tra thời gian bắt đầu, thời gian kết thúc và định dạng hợp lệ
 */
// Hàm kiểm tra thời gian
export const isTimeRangeValid = (date, startTime, endTime, duration) => {
    const now = moment().tz('Asia/Ho_Chi_Minh'); // Thời gian hiện tại với múi giờ +07:00
    let start = startTime ? moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm') : now; // Nếu không có startTime, lấy thời gian hiện tại
    let end = endTime ? moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm') : moment(start).add((duration+15), 'minutes'); // Nếu không có endTime, cộng duration

    // Kiểm tra định dạng hợp lệ
    if (!start.isValid() || !end.isValid()) {
        return { valid: false, msg: 'Thời gian không hợp lệ!' };
    }

    // Kiểm tra start trước end
    if (!start.isBefore(end)) {
        return { valid: false, msg: 'Giờ bắt đầu phải sớm hơn giờ kết thúc!' };
    }

    // Kiểm tra khoảng thời gian có lớn hơn hoặc bằng duration không
    const timeDiff = end.diff(start, 'minutes'); // Khoảng thời gian tính bằng phút
    if (timeDiff < duration) {
        return { valid: false, msg: `Khoảng thời gian phải lớn hơn hoặc bằng thời lượng phim (${duration} phút)!` };
    }

    // Kiểm tra thời gian kết thúc không được nhỏ hơn thời gian hiện tại + 30 phút
    const minEndTime = moment(now).add(45, 'minutes');
    if (end.isBefore(minEndTime)) {
        return { valid: false, msg: 'Thời gian kết thúc phải sớm thời gian hiện tại ít nhất 45 phút!' };
    }

    return { 
        valid: true, 
        startTime: start.format('HH:mm'), 
        endTime: end.format('HH:mm') // Trả về endTime đã được cập nhật
    };
};


/**
 * Kiểm tra xem trong rạp đã có suất chiếu trùng khung giờ chưa
 */
export const checkTimeConflict = async (cinema_id, date, start, end, excludeShowtimeId = null) => {
    const whereCondition = {
        cinema_id,
        showtime_date: date,
        [Op.or]: [
            { showtime_starttime: { [Op.between]: [start, end] } },
            { showtime_endtime: { [Op.between]: [start, end] } },
            {
                [Op.and]: [
                    { showtime_starttime: { [Op.lte]: start } },
                    { showtime_endtime: { [Op.gte]: end } }
                ]
            }
        ]
    };

    if (excludeShowtimeId) {
        whereCondition.showtime_id = { [Op.ne]: excludeShowtimeId };
    }

    const existing = await db.Showtime.findAll({ where: whereCondition });
    return existing.length > 0;
};

/**
 * Kiểm tra sự tồn tại của một dòng trong bảng (dùng cho movie, cinema, ...)
 */
export const checkExistence = async (model, field, value) => {
    const record = await model.findOne({ where: { [field]: value }, raw: true });
    return record;
};

export const getCinemaIdsByCluster = async (cluster_id, db) => {
    const cinemas = await db.Cinema.findAll({
        where: { cluster_id },
        attributes: ['cinema_id'],
        raw: true,
    });
    return cinemas.map(c => c.cinema_id);
};

export const getShowtimes = async (whereCondition, db) => {
    return await db.Showtime.findAll({
        where: whereCondition,
        include: [
        {
            model: db.Movie,
            as: 'movie',
            attributes: ['movie_id', 'title', 'poster'],
        },
        {
            model: db.Cinema,
            as: 'cinema',
            attributes: ['cinema_name'],
        },
        ],
        order: [
        ['showtime_date', 'ASC'],
        ['showtime_starttime', 'ASC'],
        ],
        raw: true,
        nest: true,
    });
};

export const getUniqueMovies = (showtimes) => {
    return [
        ...new Map(
        showtimes.map(st => [
            st.movie.movie_id,
            {
            movie_id: st.movie.movie_id,
            title: st.movie.title,
            poster: st.movie.poster,
            }
        ])
        ).values(),
    ];
};

export const groupShowtimesByDate = (showtimes) => {
    const grouped = {};
    showtimes.forEach(st => {
        if (!st.showtime_date || !st.showtime_starttime) {
        console.warn('Invalid showtime data:', st);
        return;
        }
        const dateKey = st.showtime_date;
        if (!grouped[dateKey]) grouped[dateKey] = [];

        grouped[dateKey].push({
        showtime_id: st.showtime_id,
        start_time: st.showtime_starttime,
        end_time: st.showtime_endtime,
        price: st.price,
        cinema_name: st.cinema.cinema_name,
        movie_id: st.movie.movie_id,
        });
    });

    return Object.keys(grouped)
        .sort()
        .map(date => ({ date, showtimes: grouped[date] }));
};
