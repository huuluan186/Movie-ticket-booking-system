import { Routes,Route, Navigate } from "react-router-dom";
import { path } from "./utils/constant";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import './assets/styles/main.scss'
import { Home, Login, Homepage, Profile, ChangePassword, MovieByStatus } from "./containers/Public";
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    useEffect(() => {
        setTimeout(() => {
        isLoggedIn && dispatch(actions.getCurrent())
        }, 500)
    }, [isLoggedIn])

  return (
    <div className="h-screen w-screen bg-primary">
        <Routes>
            <Route path={path.HOME} element={<Home />}>
                <Route index element={<Homepage/>}/> 
                <Route path={path.LOGIN} element={<Login />} />
                {isLoggedIn && 
                <>
                    <Route path={path.PROFILE} element={<Profile />} />
                    <Route path={path.CHANGEPASSWORD} element={<ChangePassword/>}/>  
                </>
                }
                <Route path={path.MOVIES_BY_STATUS} element={<MovieByStatus />} />
                <Route path="*" element={<Navigate to={path.HOME} replace />} />
            </Route>
        </Routes>

        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            className="custom-toast-container"
        />
    </div>
  );
}

export default App;