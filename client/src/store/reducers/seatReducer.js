import actionTypes from "../actions/actionTypes";

const initState = {
    seatLayout: {},
    msg:'',
}

const seatReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_SEATS:
            return {
                ...state,
                seatLayout: action.seatLayout || [],
                msg: action.msg || '',
            };
        case actionTypes.GET_SEATS:
            return {
                ...state,
                seatLayout: action.seatLayout || {},
                msg: action.msg || '',
            };
        default:
            return state;
    }
};

export default seatReducer;