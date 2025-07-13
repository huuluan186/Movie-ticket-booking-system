import moment from 'moment-timezone';
import { Op } from 'sequelize';
import db from '../models/index.js';

/**
 * Kiểm tra thời gian bắt đầu, thời gian kết thúc và định dạng hợp lệ
 */
const TIMEZONE = 'Asia/Ho_Chi_Minh';

export const isTimeRangeValid = (date, startTime, endTime, duration) => {
    const now = moment.tz(TIMEZONE).seconds(0).milliseconds(0); // 15:28, bỏ giây
    const defaultStartTime = now.format('HH:mm'); // 15:28 cho mọi ngày

    const finalStartTime = startTime || defaultStartTime;
    const start = moment.tz(`${date} ${finalStartTime}`, 'YYYY-MM-DD HH:mm', TIMEZONE).seconds(0).milliseconds(0);
    let end = endTime 
        ? moment.tz(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm', TIMEZONE).seconds(0).milliseconds(0) 
        : moment(start).add(duration + 15, 'minutes');

    if (!start.isValid() || !end.isValid()) {
        return { valid: false, msg: 'Thời gian không hợp lệ!' };
    }

    const timeDiff = end.diff(start, 'minutes');
    if (endTime && timeDiff < duration) {
        return { 
            valid: false, 
            msg: `Thời gian kết thúc không hợp lệ, phải >= thời lượng phim (${duration} phút)!` 
        };
    }

    if (end.isBefore(start) && endTime) {
        end.add(1, 'day');
    }

    const minStartTime = now; 
    if (start.isBefore(minStartTime)) {
        return { valid: false, msg: 'Thời gian bắt đầu phải bằng hoặc muộn hơn thời gian hiện tại!' };
    }

    const result = {
        valid: true,
        startTime: start.format('HH:mm'),
        endTime: end.format('HH:mm'),
        startDate: start.format('YYYY-MM-DD'),
        endDate: end.format('YYYY-MM-DD')
    };
    return result;
};

/**
 * Kiểm tra xem trong rạp đã có suất chiếu trùng khung giờ chưa
 */
export const checkTimeConflict = async (cinema_id, startDate, startTime, endDate, endTime, excludeShowtimeId = null) => {
    try {
        const start = moment.tz(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm', TIMEZONE);
        const end = moment.tz(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm', TIMEZONE);

        if (!start.isValid() || !end.isValid()) {
            return true;
        }

        // Lấy tất cả các suất chiếu trong cùng rạp
        const showtimes = await db.Showtime.findAll({
            where: {
                cinema_id,
                ...(excludeShowtimeId && {
                    showtime_id: { [Op.ne]: excludeShowtimeId }
                })
            },
            raw: true
        });

        for (const s of showtimes) {
            const existingStart = moment.tz(`${s.showtime_date} ${s.showtime_starttime}`, 'YYYY-MM-DD HH:mm', TIMEZONE);
            const existingEnd = moment.tz(`${s.showtime_date} ${s.showtime_endtime}`, 'YYYY-MM-DD HH:mm', TIMEZONE);

            // Nếu end < start nghĩa là suất đó kéo qua ngày hôm sau
            if (existingEnd.isBefore(existingStart)) {
                existingEnd.add(1, 'day');
            }

            // Thêm thời gian đệm để tránh xung đột sát giờ
            const buffer = 10; // phút
            const adjustedExistingStart = moment(existingStart).subtract(buffer, 'minutes');
            const adjustedExistingEnd = moment(existingEnd).add(buffer, 'minutes');

            if (start.isBefore(adjustedExistingEnd) && end.isAfter(adjustedExistingStart)) return true;
        }
        return false;
    } catch (error) {
        return true;
    }
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
            attributes: ['movie_id', 'title', 'poster','duration','status'],
        },
        {
            model: db.Cinema,
            as: 'cinema',
            attributes: ['cinema_name','cinema_id'],
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
                duration: st.movie.duration,
                status: st.movie.status
            }
        ])
        ).values(),
    ];
};

export const groupShowtimesByDate = (showtimes) => {
    const grouped = {};
    showtimes.forEach(st => {
        if (!st.showtime_date || !st.showtime_starttime) return;
        const dateKey = st.showtime_date;
        if (!grouped[dateKey]) grouped[dateKey] = [];

        grouped[dateKey].push({
            showtime_id: st.showtime_id,
            start_time: st.showtime_starttime,
            end_time: st.showtime_endtime,
            price: st.price,
            cinema_name: st.cinema.cinema_name,
            cinema_id: st.cinema.cinema_id,
            movie_id: st.movie.movie_id,
        });
    });

    return Object.keys(grouped).sort().map(date => ({ date, showtimes: grouped[date] }));
};
