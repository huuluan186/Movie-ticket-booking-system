import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn:false,
    isRegistered:false,
    token:null,
    msg:'',
    update:false,
}

const authReducer = (state=initState,action)=>{
    switch(action.type){
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true, // Chỉ đăng ký thành công mới là true
                token: action.data,
                msg: "",
            };

        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,  // Chỉ đăng nhập thành công mới là true
                token: action.data,
                msg: "",
            };

        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token:null,
                update:!state.update
            };

        case actionTypes.LOGOUT:
            return{
                ...state,
                isLoggedIn:false,
                msg:'',
                token:null
            }
        default:
            return state;
    }
}

export default authReducer;