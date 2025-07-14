import actionTypes from './actionTypes';
import { apiGetShowtime, apiGetShowtimeDetailById } from '../../services/showtime';

export const getShowtime = (cluster_id, movie_id) => async (dispatch) => {
    try {
        const response = await apiGetShowtime(cluster_id, movie_id);
        //console.log("response action get showtime: ", response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SHOWTIME,
                showtimesData: response?.data?.response || {},
                msg: response?.data?.msg,
                err: response?.data?.err,
            });
            return response?.data?.response || {};
        } else {
            dispatch({
                type: actionTypes.GET_SHOWTIME,
                msg: response.data.msg,
                showtimesData: {},
            });
            return {};
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SHOWTIME,
            showtimesData: {},
            msg: error || "Lỗi khi lấy thông tin lịch chiếu!",
        });
        return {};
    }
};

export const getShowtimeDetailById = (showtime_id) => async (dispatch) => {
    try {
        const response = await apiGetShowtimeDetailById(showtime_id);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SHOWTIME_DETAIL,
                showtimeDetail: response?.data?.response || {},
            });
            return response?.data?.response || {};
        } else {
            dispatch({
                type: actionTypes.GET_SHOWTIME_DETAIL,
                msg: response.data.msg,
                showtimeDetail: {},
            });
            return {};
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SHOWTIME,
            showtimeDetail: {},
            msg: error || "Lỗi khi lấy thông tin lịch chiếu!",
        });
        return {};
    }
};

export const resetShowtimes = () => ({
    type: actionTypes.RESET_SHOWTIMES,
});