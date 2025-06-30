import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { path } from "../../utils/constant";
import { logout } from "../../store/actions";
import clsx from "clsx";

const AdminLayout = () => {
    const { currentData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuItems = [
        { label: "Thống kê", to: path.DASHBOARD },
        { label: "Quản lý phim", to: "/admin/movies" },
        { label: "Quản lý suất chiếu", to: "/admin/showtimes" },
        { label: "Quản lý khách hàng", to: "/admin/users" },
        { label: "Đăng xuất", action: () => dispatch(logout()) },
    ];

    const handleClick = (item) => {
        if (item.action) item.action();
        else navigate(item.to);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-[240px] bg-white shadow-lg px-4 py-6 space-y-4">
                <div className="text-2xl font-bold text-orange-500 text-center mb-6">
                Cine<span className="text-yellow-400">Plus</span>
                </div>
                {menuItems.map((item, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(item)}
                    className={clsx(
                    "w-full text-left px-3 py-2 rounded hover:bg-orange-100",
                    window.location.pathname === item.to && "bg-orange-200 font-bold"
                    )}
                >
                    {item.label}
                </button>
                ))}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-700">Trang quản trị</h1>
                <div className="text-gray-600 text-sm">
                    Welcome, <span className="font-semibold">{currentData?.username}</span> |{" "}
                    <button
                    className="hover:underline"
                    onClick={() => navigate(path.HOME)}
                    >
                    View site
                    </button>{" "}
                    |{" "}
                    <button
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(path.CHANGEPASSWORD)}
                    >
                    Đổi mật khẩu
                    </button>{" "}
                    |{" "}
                    <button
                    className="text-red-500 hover:underline"
                    onClick={() => dispatch(logout())}
                    >
                    Đăng xuất
                    </button>
                </div>
                </header>

                {/* Nội dung */}
                <Outlet />
            </main>
        </div>
  );
};

export default AdminLayout;
