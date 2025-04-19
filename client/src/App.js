import { Routes,Route, Navigate } from "react-router-dom";
import { path } from "./utils/constant";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import './assets/styles/main.scss'
import { Home, Login, Homepage } from "./containers/Public";

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
        <Routes>
            <Route path={path.HOME} element={<Home />}>
                <Route index element={<Homepage/>}/> 
                <Route path={path.LOGIN} element={<Login />} />
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