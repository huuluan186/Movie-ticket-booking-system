import actionTypes from '../actions/actionTypes';

const initialState = {
    cinemaChains: [], //all cinema chains
    cinemaClusters: [], //clusters of a chain
    allCinemaClusters: [], //all cinema clusters
    allCinemas: [], //all cinemas
    cinemaChainDetail: null,
    cinemaClusterDetail: null,
    cinemaDetail: null,
    msg: '',
};

const cinemaReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CINEMA_CHAINS:
            return {
                ...state,
                cinemaChains: action.cinemaChainsData || [],
                msg: action.msg,
            };
        case actionTypes.GET_ALL_CINEMA_CLUSTERS:
            return {
                ...state,
                allCinemaClusters: action.allCinemaClusters || [],
                msg: action.msg,
            };
        case actionTypes.GET_ALL_CINEMAS:
            return {
                ...state,
                allCinemas: action.allCinemas || [],
                msg: action.msg,
            };
        case actionTypes.GET_CINEMA_CLUSTER:
            return {
                ...state,
                cinemaClusters: action.cinemaClustersData || [],
                msg: action.msg,
            };
        case actionTypes.GET_CINEMA_CHAIN_DETAIL:
            return {
                ...state,
                cinemaChainDetail: action.cinemaChainDetail || null,
                msg: action.msg,
            };
        case actionTypes.GET_CINEMA_CLUSTER_DETAIL:
            return {
                ...state,
                cinemaClusterDetail: action.cinemaClusterDetail || null,
                msg: action.msg,
            };
        case actionTypes.GET_CINEMA_DETAIL:
            return {
                ...state,
                cinemaDetail: action.cinemaDetail || null,
                msg: action.msg,
            };
        default:
            return state;
    }
};

export default cinemaReducer;