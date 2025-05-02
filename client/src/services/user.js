import axiosConfig from "../axios.config";

export const apiGetCurrentUser = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get-current-user',
        });
        console.log("Request Headers:", response.config.headers);
        resolve(response.data); // Trả về response.data thay vì toàn bộ response
        
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        reject(error.response?.data || error);
    }
});

export const apiUpdateInfoCurrentUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/user/profile',
            data:payload
        });
        console.log("Request Headers:", response.config.headers);
        resolve(response.data); // Trả về response.data thay vì toàn bộ response
        
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        reject(error.response?.data || error);
    }
});

export const apiChangePassword = (payload) => new Promise(async (resolve,reject) =>{
    try {
        const response = await axiosConfig({
            method:'put',
            url:'/api/v1/user/change-password',
            data:payload
        })
        console.log("Request Headers:", response.config.headers);
        resolve(response.data);
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        reject(error.response?.data || error);
    }
})