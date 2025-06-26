import actionTypes from '../actions/actionTypes';

const initialState = {
  cinemaChains: [],
  cinemaClusters: [],
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
        case actionTypes.GET_CINEMA_CLUSTER:
            return {
                ...state,
                cinemaClusters: action.cinemaClustersData || [],
                msg: action.msg,
            };
        default:
        return state;
    }
};

export default cinemaReducer;