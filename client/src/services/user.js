import axiosConfig from "../axios.config";

export const apiCreateUserByAdmin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/users',
            data: payload
        });
        resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiGetCurrentUser = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/users/me',
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
            url: '/api/v1/users/me/profile',
            data:payload
        });
        console.log("Request Headers:", response.config.headers);
        resolve(response.data); // Trả về response.data thay vì toàn bộ response
        
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        reject(error.response?.data || error);
    }
});

export const apiAdminUpdateInfoUser = (user_id, payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/users/${user_id}`,
            data:payload,
            params: {user_id}
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
            url:'/api/v1/users/',
            data:payload
        })
        console.log("Request Headers:", response.config.headers);
        resolve(response.data);
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        reject(error.response?.data || error);
    }
})

export const apiGetUsersList = () => new Promise(async (resolve,reject) =>{
    try {
        const response = await axiosConfig({
            method:'get',
            url:'/api/v1/users/',
        })
        console.log("apiGetUsersList", response);
        resolve(response.data);
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        reject(error.response?.data || error);
    }
})

export const apiGetUserRoles = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/users/roles',
        })
        console.log(response)
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteUser = (user_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/users/${user_id}`,
            params: {user_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error || error.response?.data);
    }
});