import axiosConfig from "../axios.config";
import {objectToFormData} from '../utils/helpers'

export const apiGetACinemaChainById = (chain_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/cinemachains/${chain_id}`,
            params:{chain_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiGetACinemaClusterById = (cluster_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/cinemaclusters/${cluster_id}`,
            params: {cluster_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiGetACinemaById = (cinema_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/cinemas/${cinema_id}`,
            params: {cinema_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllCinemaChains = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/cinemachains', 
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllCinemaClusters = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/cinemaclusters',
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllCinemas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/cinemas',
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetCinemaClustersByChainId = (chain_id) => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosConfig({
      method: 'get',
      url: '/api/v1/cinemaclusters',
      params: { chain_id },
    });
    //console.log('apiGetCinemaChainById response: ', response)
    resolve(response);
  } catch (error) {
    reject(error);
  }
});

export const apiCreateCinemaChain = (payload) => new Promise(async (resolve, reject) => {
    try {

        const formData = objectToFormData(payload); //  Convert sang FormData
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/cinemachains',
            data: formData
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateCinemaCluster = (payload) => new Promise(async (resolve, reject) => {
    try {

        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/cinemaclusters',
            data: payload
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateCinema = (payload) => new Promise(async (resolve, reject) => {
    try {

        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/cinemas',
            data: payload
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateCinemaChain = (chain_id, payload) => new Promise(async (resolve, reject) => {
    try {
        const formData = objectToFormData(payload); //  Convert sang FormData
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/cinemachains/${chain_id}`,
            params: {chain_id},
            data: formData
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateCinemaCluster = (cluster_id, payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/cinemaclusters/${cluster_id}`,
            params: {cluster_id},
            data: payload
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateCinema = (cinema_id, payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/cinemas/${cinema_id}`,
            params: {cinema_id},
            data: payload
        });
        return resolve(response.data);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteCinemaChain = (chain_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/cinemachains/${chain_id}`,
            params: {chain_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error || error.response?.data);
    }
});

export const apiDeleteCinemaCluster = (cluster_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/cinemaclusters/${cluster_id}`,
            params: {cluster_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error || error.response?.data);
    }
});

export const apiDeleteCinema = (cinema_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/cinemas/${cinema_id}`,
            params: {cinema_id}
        });
        resolve(response.data);
    } catch (error) {
        reject(error || error.response?.data);
    }
});


