import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { path } from "./utils/constant";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Homepage, Profile, ChangePassword, MoviesByStatus, MovieDetail, Showtime, BookingTicket, MyTicket, Search} from "./containers/Public";
import { AdminLayout, Statistic, UserManager, AddUser, UpdateUser, CinemaChainManager, AddCinemaChain, UpdateCinemaChain, CinemaClusterManager, AddCinemaCluster, UpdateCinemaCluster, CinemaManager, AddCinema, UpdateCinema, MovieManager, AddMovie, UpdateMovie, ShowtimeManager } from "./containers/Admin";
import {RequireAuth} from "./components";
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        isLoggedIn && dispatch(actions.getCurrent())
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
            {/* Website routes */}
            <Route path={path.HOME} element={<Home />}>
                <Route index element={<Homepage/>}/> 
                <Route path={path.LOGIN} element={<Login />} />
                 {/* Các route BẢO VỆ */}
                <Route element={<RequireAuth />}>
                    <Route path={path.PROFILE} element={<Profile />} />
                    <Route path={path.CHANGEPASSWORD} element={<ChangePassword />} />
                    <Route path={path.BOOKING_TICKET} element={<BookingTicket />} />
                    <Route path={path.MY_TICKET} element={<MyTicket />} />
                </Route>
                {/* Các route CÔNG KHAI */}
                <Route path={path.MOVIES_BY_STATUS} element={<MoviesByStatus />} />
                <Route path={path.MOVIE_DETAIL} element={<MovieDetail />} />
                <Route path={path.SHOWTIME} element={<Showtime />} />
                <Route path={path.SEARCH.split('?')[0]} element={<Search />} />
                <Route path="*" element={<Navigate to={path.HOME} replace />} />
            </Route>

            {/* Admin routes */}
            <Route element={<RequireAuth requiredRole="admin" />}>
                <Route path={path.ADMIN} element={<AdminLayout />}>
                    <Route index element={<Navigate to={path.DASHBOARD} replace />} />
                    <Route path={path.DASHBOARD} element={<Statistic />} />
                    <Route path={path.USER_MANAGER} element={<UserManager />}>
                        <Route path={path.ADD} element={<AddUser />} />
                        <Route path={path.UPDATE} element={<UpdateUser />} />
                    </Route>
                    <Route path={path.CINEMA_CHAIN_MANAGER} element={<CinemaChainManager />}>
                        <Route path={path.ADD} element={<AddCinemaChain />} />
                        <Route path={path.UPDATE} element={<UpdateCinemaChain />} />
                    </Route>
                    <Route path={path.CINEMA_CLUSTER_MANAGER} element={<CinemaClusterManager />}>
                        <Route path={path.ADD} element={<AddCinemaCluster />} />
                        <Route path={path.UPDATE} element={<UpdateCinemaCluster />} />
                    </Route>
                    <Route path={path.CINEMA_MANAGER} element={<CinemaManager />}>
                        <Route path={path.ADD} element={<AddCinema />} />
                        <Route path={path.UPDATE} element={<UpdateCinema />} />
                    </Route>
                    <Route path={path.MOVIE_MANAGER} element={<MovieManager />}>
                        <Route path={path.ADD} element={<AddMovie />} />
                        <Route path={path.UPDATE} element={<UpdateMovie />} />
                    </Route>
                    <Route path={path.SHOWTIME_MANAGER} element={<ShowtimeManager />}>
                    </Route>
                </Route>
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