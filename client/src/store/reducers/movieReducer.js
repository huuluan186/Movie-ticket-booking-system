import actionTypes from "../actions/actionTypes";

const initState = {
    moviesData: {},
    movieDetail: null,
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
        case actionTypes.GET_MOVIE_DETAIL:
            return {
                ...state,
                movieDetail: action.movieDetail || {},
                msg: action.msg || '',
            };
        default:
            return state;
    }
};

export default movieReducer;