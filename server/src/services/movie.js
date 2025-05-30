import { raw } from 'express';
import db from '../models';
import { v4 } from 'uuid';

const statusTranslations = {
  'Coming Soon': 'Phim sắp chiếu',
  'Now Showing': 'Phim đang chiếu'
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

export const getMovieLimitService = (limit, offset) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Movie.findAndCountAll({
            raw: true,
            //nested: true,
            limit: +process.env.LIMIT || limit,
            offset: offset * (+process.env.LIMIT) || 0,
        });
        resolve ({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get movie list limit',
            response: response
          });
    } catch (error) {
        reject(error);
    }
})

export const getAllMoviesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Movie.findAll();
        resolve ({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get all movies',
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

export const updateMovieService = (movie_id,  data ) => new Promise(async (resolve, reject) => {
    try {
        const { title, country, genre, duration, release_date, age_limit, director, cast, description, linkTrailer, thumbnail, poster, status } = data;

        const response = await db.Movie.findOne({where: { movie_id }, raw: true});
        if(!response) {
            return resolve({
                err: 1,
                msg: 'Phim không tồn tại.',
                response: null
            })
        }
    
        for (const field of requiredFields) {
            if (field in data) {
                const newValue = data[field];
                const oldValue = response[field];

                // Nếu có thay đổi mà newValue bị rỗng => báo lỗi
                if (newValue !== oldValue && (!newValue || newValue.toString().trim() === '')) {
                    return resolve({
                        err: 1,
                        msg: `${field} không được để trống.`,
                    });
                }
            }
        }
        await db.Movie.update(data, { where: { movie_id } });
        resolve({
            err: 0,
            msg: 'Cập nhật phim thành công!',
        });
    } catch (error) {
        reject(error);
    }
})

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
