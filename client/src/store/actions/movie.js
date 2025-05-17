import actionTypes from './actionTypes'
import { apiGetMovieDetail, apiGetMovieList } from '../../services/movie'

export const getMovieList = () => async (dispatch) => {
    try {
        const response = await apiGetMovieList()
        console.log("response action get movie list: ",response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_MOVIES,
                moviesData: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_MOVIES,
                msg: response.data.msg,
                moviesData: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_MOVIES,
            moviesData: null,
            msg: error || "Lỗi khi lấy danh sách phim!",
        })
    }
}

export const getMovieDetail = (movieId) => async (dispatch) => {
    try {
        const response = await apiGetMovieDetail(movieId)
        console.log("response action get movie detail: ",response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_MOVIE_DETAIL,
                movieDetail: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_MOVIE_DETAIL,
                msg: response.data.msg,
                movieDetail: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_MOVIE_DETAIL,
            movieDetail: null,
            msg: error || "Lỗi khi lấy thông tin phim!",
        })
    }
}