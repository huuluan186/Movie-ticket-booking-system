import actionTypes from './actionTypes'
import { apiRegister, apiLogin } from '../../services/auth' 
import { jwtDecode } from 'jwt-decode'

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload);
        console.log("response action action: ",response);
        if(response?.data.err===0){
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            }) 
        }else{
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}

export const resetRegisterStatus = () => ({
    type: actionTypes.RESET_REGISTER_STATUS
});

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload);
        console.log("response action login: ",response);
        if(response?.data.err===0){
            const token = response.data.token;
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: {
                    token: token,
                    user_role: jwtDecode(token).role
                }
            }) 
        }else{
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})