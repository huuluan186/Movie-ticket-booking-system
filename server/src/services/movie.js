import db from '../models/index.js';
import { v4 } from 'uuid';

const statusTranslations = {
  'Coming Soon': 'sắp chiếu',
  'Now Showing': 'đang chiếu'
};

// Các trường bắt buộc
const requiredFields = ['title', 'country', 'genre', 'duration', 'release_date', 'status'];

export const getMovieStatusesService = () => new Promise(async (resolve, reject) => {
    try {
        // Lấy danh sách giá trị ENUM của trường status từ model Movie
        const statusEnumValues = db.Movie.rawAttributes.status.values;

        if (!statusEnumValues || statusEnumValues.length === 0) {
        return resolve({
            err: 1,
            msg: 'Trường status không có giá trị ENUM được định nghĩa',
            response: null
        });
        }

        // Map sang tiếng Việt
        const statuses = statusEnumValues.map(englishValue => ({
            englishValue,
            vietnameseValue: statusTranslations[englishValue] || englishValue
        }));

        resolve({
            err: statuses ? 0 : 1,
            msg: statuses ? 'OK' : 'Failed to get statuses of movie',
            response: statuses
        });
    } catch (error) {
        reject(error);
    }
});

export const getMoviesService = ({ status, limit, offset }) => new Promise(async (resolve, reject) => {
    try {
        const query = {
            raw: true,
            where: {},
        };

        if (status) {
            query.where.status = status; // lọc theo status nếu có
            // Sắp xếp tùy theo trạng thái
            if (status === 'Coming Soon') {
                query.order = [['release_date', 'ASC']];  // gần nhất trước
            } else if (status === 'Now Showing') {
                query.order = [['release_date', 'DESC']]; // mới nhất trước
            } else {
                query.order = [['release_date', 'DESC']];
            }
        } else {
            // Không có status → mặc định giảm dần
            query.order = [['release_date', 'DESC']];
        }

        //phân trang nếu có
        if(limit) {
            const parsedLimit = limit ? +limit : (+process.env.LIMIT || 8);
            const parsedOffset = offset ? offset * parsedLimit : 0;
            query.limit = parsedLimit;
            query.offset = parsedOffset;
        }
        
        // Nếu không có limit, lấy tất cả, nên dùng findAndCountAll để lấy count + rows
        const response = await db.Movie.findAndCountAll(query);

        resolve ({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get movies list',
            response: response
          });
    } catch (error) {
        reject(error);
    }
})

export const createMovieService = ({ title, country, genre, duration, release_date, age_limit, director, cast, description, linkTrailer, thumbnail, poster, status }) => new Promise(async (resolve, reject) => {
    try {
        // Kiểm tra các trường bắt buộc
        const inputData = { title, country, genre, duration, release_date, status };

        // Kiểm tra các trường bắt buộc
        for (const field of requiredFields) {
            if (!inputData[field] || inputData[field].toString().trim() === '') {
                return resolve({
                    err: 1,
                    msg: `Missing input value: '${field}' is required.`
                });
            }
        }
       
        const movie = await db.Movie.create({
            movie_id: v4(),
            title,
            country,
            genre,
            duration,
            release_date,
            age_limit: age_limit || 'Not rated',
            director: director || 'Unknown',
            cast: cast || 'Unknown',
            description: description || 'No description',
            linkTrailer: linkTrailer || null,
            thumbnail: thumbnail || null, 
            poster: poster || null,
            status
        });

        resolve({
            err: movie ? 0 : 1,
            msg: movie ? 'Movie created successfully!' : 'Failed to create movie.',
            response: movie
        })
    } catch (error) {
        reject(error);
    }
})

export const getMovieDetailService = (movie_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Movie.findOne({where: { movie_id }, raw: true});
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Phim không tồn tại.',
            response
        })
    } catch (error) {
        reject(error);
    }
})

export const updateMovieService = (movie_id, data) => new Promise(async (resolve, reject) => {
    try {
        const movie = await db.Movie.findOne({ where: { movie_id }, raw: true });
        if (!movie) {
            return resolve({
                err: 1,
                msg: 'Phim không tồn tại.',
                response: null
            });
        }

        // Kiểm tra trường bắt buộc nếu được sửa và khác dữ liệu cũ
        for (const field of requiredFields) {
            if (field in data) {
                const newValue = data[field];
                const oldValue = movie[field];

                if (newValue !== oldValue && (!newValue || newValue.toString().trim() === '')) {
                    return resolve({
                        err: 1,
                        msg: `Trường '${field}' không được để trống.`,
                    });
                }
            }
        }

        // Chỉ cập nhật trường thay đổi
        const updatedFields = {};
        for (const key in data) {
            if (data[key] !== movie[key]) {
                updatedFields[key] = data[key];
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            return resolve({
                err: 0,
                msg: 'Không có thay đổi nào được gửi lên.',
            });
        }

        await db.Movie.update(updatedFields, { where: { movie_id } });

        resolve({
            err: 0,
            msg: 'Cập nhật phim thành công!',
        });
    } catch (error) {
        reject(error);
    }
});


export const deleteMovieService = (movie_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Movie.destroy({ where: { movie_id } });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Xóa phim thành công!' : 'Phim không tồn tại.',
        });
    } catch (error) {
        reject(error);
    }
});
