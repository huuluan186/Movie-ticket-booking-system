import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const location = useLocation();

  // Chưa đăng nhập → chuyển về trang login và nhớ đường dẫn gốc
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Đã đăng nhập → cho hiển thị các route con
  return <Outlet />;
};

export default RequireAuth;
