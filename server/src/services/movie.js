import db from '../models';
import movie from '../models/movie';
import { v4 } from 'uuid';

const statusTranslations = {
  'Coming Soon': 'Phim sắp chiếu',
  'Now Showing': 'Phim đang chiếu'
};

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

export const createMovieService = ({ title, country, genre, duration, release_date, age_limit, director, cast, description, linkTrailer, thumbnail, poster, status }) => new Promise(async (resolve, reject) => {
    try {
        // Kiểm tra các trường bắt buộc
        if (!title || !country || !genre || !duration || !release_date || !status) {
            return resolve({ err: 1, msg: 'Missing input value: title, country, genre, duration, release_date, and status are required.' });
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
        const response = await db.Movie.findOne({
            where: { movie_id },
            raw: true
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get current user.',
            response
        })
    } catch (error) {
        reject(error);
    }
})