import axiosConfig from "../axios.config";

export const apiGetShowtime = (cluster_id, movie_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/showtimes`,
            params: { cluster_id, movie_id},
        });
        console.log('apiGetShowtime response: ', response)
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetShowtimeDetailById = (showtime_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/showtimes/${showtime_id}`,
            params: { showtime_id},
        });
        console.log('apiGetShowtime detail response: ', response)
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
