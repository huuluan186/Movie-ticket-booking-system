import actionTypes from '../actions/actionTypes';

const initialState = {
    movies: [],
    showtimesByDate: [],
    showtimeDetail: null,
    msg: '',
};

const showtimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SHOWTIME:
            return {
                ...state,
                movies: action.showtimesData.movies || [],
                showtimesByDate: action.showtimesData.showtimesByDate || [],
                msg: action.msg,
            };
        case actionTypes.GET_SHOWTIME_DETAIL:
            return {
                ...state,
                showtimeDetail: action.showtimeDetail || [],
                msg:action.msg,
            };
        case actionTypes.RESET_SHOWTIMES:
            return {
                ...state,
                showtimesByDate: [],
            }
        default:
            return state;
    }
}

export default showtimeReducer;