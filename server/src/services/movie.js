import db from '../models';

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