import actionTypes from './actionTypes'
import {apiGetCurrentUser, apiUpdateInfoCurrentUser } from '../../services/user'
import { logout } from './auth';

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

         //Khi token hết hạn thì sẽ logout
        if (error.err === 1 && error.msg.includes('expired')) {
                dispatch(logout());
        }
    }
};

export const updateProfile = (payload) => async (dispatch) => {
    try {
        const response = await apiUpdateInfoCurrentUser(payload)
        console.log('response action update user:', response);
        if(response?.err === 0 ){
            dispatch({
                type: actionTypes.UPDATE_PROFILE_SUCCESS,
                msg: response.msg,
                currentData : response.response
            })
            return { success: true, message: response.msg };
        }else {
            dispatch({
              type: actionTypes.UPDATE_PROFILE_FAIL,
              msg: response.msg,
              currentData: null,
            });
            return { success: false, message: response.msg };
        }    
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PROFILE_FAIL,
            currentData: null,
            msg: error || "Cập nhật thông tin thất bại",
        })
        return { success: false, message: error?.message || "Cập nhật thông tin thất bại" };
    }
}

