import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) config.headers.authorization = `Bearer ${token}`;
        else console.warn("🚫 No token attached in headers.");
        // Chỉ set nếu data là FormData
        if (config.data instanceof FormData) config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
