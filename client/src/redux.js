import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { legacy_createStore as createStore } from "redux";

const reduxStore=()=>{
    let store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    let persistor = persistStore(store)
    return {store,persistor}
}

export default reduxStore;