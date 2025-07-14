import actionTypes from './actionTypes';
import { apiGetAllCinemaChains, apiGetCinemaClustersByChainId, apiGetACinemaChainById, apiGetAllCinemaClusters, apiGetACinemaClusterById, apiGetAllCinemas, apiGetACinemaById, apiGetCinemasByClusterId} from '../../services/cinema';

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

export const getAllCinemaClusters = () => async (dispatch) => {
    try {
        const response = await apiGetAllCinemaClusters();
        console.log("response action get all cinema clusters: ", response);
        if (response?.data.err === 0) {
        dispatch({
            type: actionTypes.GET_ALL_CINEMA_CLUSTERS,
            allCinemaClusters: response.data.response.rows || [],
        });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_CINEMA_CLUSTERS,
                msg: response.data.msg,
                allCinemaClusters: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_CINEMA_CLUSTERS,
            allCinemaClusters: null,
            msg: error || "Lỗi khi lấy danh sách cụm rạp!",
        });
    }
};

export const getAllCinemas = () => async (dispatch) => {
    try {
        const response = await apiGetAllCinemas();
        console.log("response action get all cinemas: ", response);
        if (response?.data.err === 0) {
        dispatch({
            type: actionTypes.GET_ALL_CINEMAS,
            allCinemas: response.data.response.rows || [],
        });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_CINEMAS,
                msg: response.data.msg,
                allCinemas: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_CINEMAS,
            allCinemas: null,
            msg: error || "Lỗi khi lấy danh sách rạp!",
        });
    }
};

export const getACinemaChainById = (chain_id) => async (dispatch) => {
    try {
        const response = await apiGetACinemaChainById(chain_id);
        if (response?.err === 0) {
            dispatch({
                type: actionTypes.GET_CINEMA_CHAIN_DETAIL,
                cinemaChainDetail: response.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CINEMA_CHAIN_DETAIL,
                cinemaChainDetail: null,
                msg: response.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CINEMA_CHAIN_DETAIL,
            cinemaChainDetail: null,
            msg: error.message || "Lỗi lấy thông tin chuỗi rạp!",
        });
    }
};

export const getACinemaClusterById = (cluster_id) => async (dispatch) => {
    try {
        const response = await apiGetACinemaClusterById(cluster_id);
        if (response?.err === 0) {
            dispatch({
                type: actionTypes.GET_CINEMA_CLUSTER_DETAIL,
                cinemaClusterDetail: response.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CINEMA_CLUSTER_DETAIL,
                cinemaClusterDetail: null,
                msg: response.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CINEMA_CLUSTER_DETAIL,
            cinemaClusterDetail: null,
            msg: error.message || "Lỗi lấy thông tin cụm rạp!",
        });
    }
};

export const getACinemaById = (cinema_id) => async (dispatch) => {
    try {
        const response = await apiGetACinemaById(cinema_id);
        if (response?.err === 0) {
            dispatch({
                type: actionTypes.GET_CINEMA_DETAIL,
                cinemaDetail: response.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CINEMA_DETAIL,
                cinemaDetail: null,
                msg: response.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CINEMA_DETAIL,
            cinemaDetail: null,
            msg: error.message || "Lỗi lấy thông tin rạp!",
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

export const getCinemasByClusterId = (cluster_id) => async (dispatch) => {
    try {
        const response = await apiGetCinemasByClusterId(cluster_id);
        if (response?.data.err === 0) {
        dispatch({
            type: actionTypes.GET_CINEMA,
            cinemasData: response.data.response.rows || [],
        });
        } else {
            dispatch({
                type: actionTypes.GET_CINEMA,
                msg: response.data.msg,
                cinemasData: [],
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CINEMA,
            cinemaClustersData: [],
            msg: error || "Lỗi khi lấy thông tin rạp!",
        });
    }
};