import axiosConfig from "../axios.config";

export const apiGetSeats = (cinema_id, showtime_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/seats`,
            params: {cinema_id, showtime_id},
        });
        console.log('apiGetSeats response: ', response)
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
