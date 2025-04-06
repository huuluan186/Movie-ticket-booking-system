import React from "react";
import {Header} from './index'
import { Outlet } from "react-router-dom";
const Home = () => {
    return(
        <div className="w-full flex flex-col items-center m-auto h-full">
             <div className="w-full bg-white flex flex-col items-center">
                <Header/>
            </div>
           
            {/* <div className="w-[80%] flex flex-col items-start justify-start mt-3 bg-primary">
                <Outlet/>
            </div> */}
        </div>
    )
}

export default Home;