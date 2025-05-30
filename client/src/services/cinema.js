import axiosConfig from "../axios.config";

export const apiGetAllCinemaChains = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosConfig({
      method: 'get',
      url: '/api/v1/cinemachains', 
    });
    //console.log('apiGetAllCinemaChains response: ', response)
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

