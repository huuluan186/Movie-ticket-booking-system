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

