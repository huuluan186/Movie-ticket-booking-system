import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('persist:auth')
    console.log('>>> token:',token)
    return config;
}, function (error) {
    console.log('>>> error:',error)
    return Promise.reject(error);
});

export default instance;