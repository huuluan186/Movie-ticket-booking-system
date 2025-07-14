import actionTypes from "../actions/actionTypes";

const initState = {
    orderHistory: [],
    msg: '',
    order_id: null,
    update: false,
};

const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                msg: action.msg,
                order_id: action.order_id,
                update: !state.update,
            };
        case actionTypes.CREATE_ORDER_FAIL:
            return {
                ...state,
                msg: action.msg,
                update: !state.update,
            };
        case actionTypes.GET_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                orderHistory: action.datas || [],
                msg: action.msg,
            };
        case actionTypes.GET_ORDER_HISTORY_FAIL:
            return {
                ...state,
                msg: action.msg,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                orderHistory: [],
                msg: '',
                order_id: null,
                update: false,
            };
        default:
            return state;
    }
};

export default orderReducer;