import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn:false,
    isRegistered:false,
    token:null,
    msg:'',
    update:false,
    user_role: null,
}

const authReducer = (state=initState,action)=>{
    switch(action.type){
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true, // Chỉ đăng ký thành công mới là true
                token: action.data.token,
                msg: "",
            };

        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,  // Chỉ đăng nhập thành công mới là true
                token: action.data.token,
                user_role: action.data.user_role,
                msg: "",
            };

        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token:null,
                user_role:null,
                update:!state.update
            };

        case actionTypes.RESET_REGISTER_STATUS:
            return {
                ...state,
                isRegistered: false,
                msg: ""
            };
        case actionTypes.LOGOUT:
            return{
                ...state,
                isLoggedIn:false,
                msg:'',
                user_role:null,
                token:null
            }
        default:
            return state;
    }
}

export default authReducer;