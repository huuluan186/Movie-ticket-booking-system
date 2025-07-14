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

export const apiDeleteShowtime = (showtime_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/showtimes/${showtime_id}`,
            params: {showtime_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error || error.response?.data);
    }
});

export const apiCreateShowtime = (payload, movie_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/showtimes/${movie_id}`,
            params: {movie_id},
            data: payload,
        });
        console.log('apiCreateShowtime response: ', response)
        resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateShowtime = (payload, showtime_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/showtimes/${showtime_id}`,
            params: {showtime_id},
            data: payload,
        });
        resolve(response.data);
    } catch (error) {
        reject(error);
    }
});