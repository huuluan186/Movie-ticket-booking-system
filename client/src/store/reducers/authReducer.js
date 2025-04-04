const initState = {
    isLoggedIn:false,
    token:null
}

const authReducer = (state=initState,actions)=>{
    switch(actions.types){
        default:
            return state;
    }
}

export default authReducer;