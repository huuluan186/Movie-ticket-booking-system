import axiosConfig from "../axios.config";

export const apiGetVipPriceIncrementConfig = () => new Promise(async (resolve,reject)=>{
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/configs',
        })
        console.log("apiGetVipPriceIncrementConfig: ",response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})