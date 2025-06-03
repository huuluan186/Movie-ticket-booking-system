import authReducer from "./authReducer";
import userReducer from "./userReducer";
import movieReducer from "./movieReducer";
import cinemaReducer from "./cinemaReducer"
import showtimeReducer from "./showtimeReducer";
import seatReducer from "./seatReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig={
    ...commonConfig,
    key:'auth',
    whitelist:['isLoggedIn','token'], // Chỉ lưu trữ các trường này trong authReducer
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig,authReducer),
    user:userReducer,
    movie:movieReducer,
    cinema: cinemaReducer,
    showtime: showtimeReducer,
    seat: seatReducer,
})

export default rootReducer;