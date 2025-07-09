import axiosConfig from "../axios.config";
import { objectToFormData } from "../utils/helpers";

export const apiGetMovieStatuses = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/movies/statuses',
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetMovieList = (query={}) => new Promise(async (resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/movies',
            params: query,
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetMovieDetail = (movieId) => new Promise(async (resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/movies/${movieId}`,
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiSearchMovies = () => new Promise(async (resolve, reject) => {
    try {
        const response = await apiGetMovieList(); // Lấy tất cả phim
        console.log('Search movies:', response);
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteMovie= (movie) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/movies/${movie}`,
            params: {movie}
        });
        resolve(response.data);
    } catch (error) {
        reject(error || error.response?.data);
    }
});

export const apiCreateMovie = (payload) => new Promise(async (resolve, reject) => {
    try {
        const formData = objectToFormData(payload);
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/movies',
            data: formData
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateMovie = (movie_id, payload) => new Promise(async (resolve, reject) => {
    try {
        const formData = objectToFormData(payload);
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/movies/${movie_id}`,
            params: {movie_id},
            data: formData
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});