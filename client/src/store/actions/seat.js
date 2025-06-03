import actionTypes from './actionTypes'
import {apiGetSeats} from '../../services/seat'

export const getSeatLayout = (cinema_id) => async (dispatch) => {
    try {
        const response = await apiGetSeats(cinema_id)
        console.log("response getSeatLayout: ",response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SEATS,
                seatLayout: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_SEATS,
                msg: response.data.msg,
                seatLayout: {}
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SEATS,
            seatLayout: {},
            msg: error || "Lỗi khi lấy danh sách ghế!",
        })
    }
}