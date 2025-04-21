import actionTypes from './actionTypes'
import {apiGetCurrentUser } from '../../services/user'


export const getCurrent = () => async (dispatch) => {
    try {
        const response = await apiGetCurrentUser()
        console.log("response action get user: ",response);
        if (response?.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                msg: response.data.msg,
                currentData: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            msg: error,
        })
    }
}