import React from "react";
import {Footer, Header} from './index'
import { Outlet, useLocation} from "react-router-dom";
const Home = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <div className="min-h-screen flex flex-col wrapper">
            {/* Header */}
            <div className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md flex flex-col items-center border-b border-gray-300 shadow-md">
                <Header />
            </div>
            
            {/* Main content */}
            <main className={`flex-grow ${isLoginPage ? "bg-login min-h-screen flex justify-center items-center" : "bg-primary container-fluid"}`}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="mt-auto bg-gray-800 text-white">
                <Footer/>
            </footer>
        </div>
    );
};

export default Home;