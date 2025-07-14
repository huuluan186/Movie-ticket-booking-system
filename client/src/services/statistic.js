import axiosConfig from "../axios.config";

export const apiGetRevenueByMovie = (filters={}) => new Promise(async (resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/statistics/movies',
            params: filters,
        })
    console.log('apiGetRevenueByMovie response: ', response);        
    resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetRevenueByCluster = (filters={}) => new Promise(async (resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/statistics/clusters',
            params: filters,
        })
        console.log('apiGetRevenueByCluster response: ', response);
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
