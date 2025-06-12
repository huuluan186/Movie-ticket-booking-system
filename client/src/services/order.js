import axiosConfig from "../axios.config";

export const apiCreateOrder = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/users/me/orders',
            data: payload,
        });
        console.log("Order creation response:", response);
        resolve(response.data);
    } catch (error) {
        reject(error.response?.data || error);
    }
});

export const apiGetOrderHistory = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/users/me/orders',
        });
        console.log("Order history response:", response);
        resolve(response.data);
    } catch (error) {
        reject(error.response?.data || error);
    }
});