import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {},
    msg:'',
    update:false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                currentData: action.currentData || {},
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_PROFILE_FAIL:
            return{
                ...state,
                currentData: action.currentData || {},
                msg: action.msg || '',
                update: !state.update
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {},
                msg:'',
                update:false,
            }


        default:
            return state;
    }
}

export default userReducer
