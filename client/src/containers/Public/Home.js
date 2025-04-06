import React from "react";
import {Header} from './index'
import { Outlet, useLocation} from "react-router-dom";
const Home = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    return(
        <div className="w-full flex flex-col items-center m-auto h-full">
             <div className="w-full bg-white flex flex-col items-center">
                <Header/>
            </div>
           
            <div className={` flex flex-col items-start ${isLoginPage ? "w-full bg-login h-screen justify-center" : "w-[80%] justify-start bg-primary"} `}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Home;