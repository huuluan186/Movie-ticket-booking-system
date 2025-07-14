import actionTypes from "./actionTypes";
import { apiCreateOrder, apiGetOrderHistory } from "../../services/order";

export const createOrder = (payload) => async (dispatch) => {
    try {
        const response = await apiCreateOrder(payload);
        if (response.err === 0) {
            dispatch({
                type: actionTypes.CREATE_ORDER_SUCCESS,
                msg: response.msg,
                order_id: response.order_id,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_ORDER_FAIL,
                msg: response.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_ORDER_FAIL,
            msg: 'Lỗi khi đặt vé!',
        });
    }
};

export const getOrderHistory = () => async (dispatch) => {
    try {
        const response = await apiGetOrderHistory();
        console.log("response action order history: ", response);
        if (response.err === 0) {
            dispatch({
                type: actionTypes.GET_ORDER_HISTORY_SUCCESS,
                datas: response.response,
                msg: response.msg,
            });
            console.log("response action fetcher order historysss: ", response.response);
        } else {
            dispatch({
                type: actionTypes.GET_ORDER_HISTORY_FAIL,
                msg: response.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ORDER_HISTORY_FAIL,
            msg: 'Lỗi khi lấy lịch sử!',
        });
    }
};