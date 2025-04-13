import React from "react";
import {Header} from './index'
import { Outlet, useLocation} from "react-router-dom";
const Home = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <div className="min-h-screen flex flex-col wrapper">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md flex flex-col items-center border-b border-gray-300 shadow-md">
                <Header />
            </header>

            {/* Main content */}
            <main className={`flex-grow ${isLoginPage ? "bg-login min-h-screen flex justify-center items-center" : "bg-primary container mx-auto py-6"}`}>
                <Outlet />
            </main>

            {/* Footer */}
            {/* <footer className="mt-auto bg-gray-800 text-white">
                FOOTER
                <div>
                    <ul>
                        <li>Liên hệ</li>
                        <li>Giới thiệu</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản sử dụng</li>
                    </ul>
                </div>
            </footer> */}
        </div>
    );
};

export default Home;