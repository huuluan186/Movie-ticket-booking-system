import actionTypes from './actionTypes';
import { apiGetAllCinemaChains, apiGetCinemaClustersByChainId } from '../../services/cinema';

export const getAllCinemaChains = () => async (dispatch) => {
    try {
        const response = await apiGetAllCinemaChains();
        console.log("response action get all cinema chains: ", response);
        if (response?.data.err === 0) {
        dispatch({
            type: actionTypes.GET_ALL_CINEMA_CHAINS,
            cinemaChainsData: response.data.response.rows || [],
        });
        } else {
        dispatch({
            type: actionTypes.GET_ALL_CINEMA_CHAINS,
            msg: response.data.msg,
            cinemaChainsData: null,
        });
        }
    } catch (error) {
        dispatch({
        type: actionTypes.GET_ALL_CINEMA_CHAINS,
        cinemaChainsData: null,
        msg: error || "Lỗi khi lấy danh sách chuỗi rạp!",
        });
    }
};

export const getCinemaClustersByChainId = (chain_id) => async (dispatch) => {
    try {
        const response = await apiGetCinemaClustersByChainId(chain_id);
        console.log("response action get cinema chain by id: ", response);
        if (response?.data.err === 0) {
        dispatch({
            type: actionTypes.GET_CINEMA_CLUSTER,
            cinemaClustersData: response.data.response.rows || [],
        });
        } else {
        dispatch({
            type: actionTypes.GET_CINEMA_CLUSTER,
            msg: response.data.msg,
            cinemaClustersData: [],
        });
        }
    } catch (error) {
        dispatch({
        type: actionTypes.GET_CINEMA_CLUSTER,
        cinemaClustersData: [],
        msg: error || "Lỗi khi lấy thông tin cụm rạp!",
        });
    }
};