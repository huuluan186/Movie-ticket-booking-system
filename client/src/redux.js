import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { legacy_createStore as createStore, applyMiddleware} from "redux";
import { thunk } from "redux-thunk";

const reduxStore=()=>{
    let store = createStore(rootReducer,applyMiddleware(thunk))
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    let persistor = persistStore(store)
    return {store,persistor}
}

export default reduxStore;