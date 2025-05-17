import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { path } from "./utils/constant";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import './assets/styles/main.scss'
import { Home, Login, Homepage, Profile, ChangePassword, ComingSoon, NowShowing
, MovieDetail  } from "./containers/Public";
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

    const { pathname } = useLocation();
    useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // có thể bỏ nếu không muốn cuộn mượt
    });
  }, [pathname]);
  return (
    <div className="min-h-screen bg-primary">
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
                <Route path={path.COMING_SOON} element={<ComingSoon />} />
                <Route path={path.NOW_SHOWING} element={<NowShowing />} />
                console.log('MovieDetail:', MovieDetail);

                <Route path={path.MOVIE_DETAIL} element={<MovieDetail />} />
               console.log('MovieDetail:', MovieDetail);

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