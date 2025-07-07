import axiosConfig from "../axios.config";

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