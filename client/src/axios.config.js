import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        } else {
            console.warn("🚫 No token attached in headers.");
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
