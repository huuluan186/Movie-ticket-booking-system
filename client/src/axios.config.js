import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

instance.interceptors.request.use(
    function (config) {
        const raw = window.localStorage.getItem('persist:auth');
        let token = null;
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed?.token) {
                token = JSON.parse(parsed.token); // ✅ tránh slice
            }
        }

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
