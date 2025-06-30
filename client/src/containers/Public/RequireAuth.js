import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { path } from "../../utils/constant";

const RequireAuth = ({ requiredRole = null }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { currentData } = useSelector(state => state.user);
    const location = useLocation();

    // Chưa đăng nhập → chuyển về trang login và nhớ đường dẫn gốc
    if (!isLoggedIn) {
        return <Navigate to={path.LOGIN} state={{ from: location }} replace />;
    }

    if (requiredRole && currentData?.user_role !== requiredRole) {
        return <Navigate to="/" replace />;
    }
    
    // Đã đăng nhập → cho hiển thị các route con
    return <Outlet />;
};

export default RequireAuth;
