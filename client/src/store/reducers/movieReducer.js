import actionTypes from "../actions/actionTypes";

const initState = {
    moviesData: {},
    msg:'',
}

const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIES:
            return {
                ...state,
                moviesData: action.moviesData || [],
                msg: action.msg || '',
            };
        default:
            return state;
    }
};

export default movieReducer;