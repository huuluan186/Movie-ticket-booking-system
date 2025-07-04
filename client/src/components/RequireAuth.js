import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { path } from "../utils/constant";

const RequireAuth = ({ requiredRole = null }) => {
    const { isLoggedIn, user_role} = useSelector(state => state.auth);
    const location = useLocation();

    // Chưa đăng nhập → chuyển về trang login và nhớ đường dẫn gốc
    if (!isLoggedIn)  return <Navigate to={path.LOGIN} state={{ from: location }} replace />;

    if (requiredRole && user_role !== requiredRole)  return <Navigate to="/" replace />;
    
    // Đã đăng nhập → cho hiển thị các route con
    return <Outlet />;
};

export default RequireAuth;
