import axiosConfig from "../axios.config";

export const apiGetSeats = (cinema_id, showtime_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/seats`,
            params: {cinema_id, showtime_id},
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateSeatsForCinema = (cinema_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/seats/${cinema_id}`,
            params: {cinema_id},
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
