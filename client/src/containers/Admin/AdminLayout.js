import { Outlet, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { path } from "../../utils/constant";
import { logout } from "../../store/actions";
import clsx from "clsx";
import logo from '../../assets/logo-icon-dark-transparent-removebg.png'
import icons from "../../utils/icon";
import { adminSidebarItems } from "../../utils/menuItems";

const {IoLogOutOutline} = icons

const AdminLayout = () => {
    const { currentData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuItems = adminSidebarItems;

    const handleClick = (item) => {
        if (item.action) item.action();
        else navigate(item.to);
    };

    return (
        <div className="flex min-h-screen bg-gray-200">
            {/* Sidebar */}
            <aside className="w-60 bg-white shadow-lg sticky top-0 h-screen">
                <div className="w-full mx-auto py-2">
                    {logo && <img src={logo} alt="Logo" className="w-full h-40 object-contain"/>}
                </div>
                {menuItems.map((item, i) => {
                    const isActive = window.location.pathname === item.to;
                    return (
                         <button
                            key={i}
                            onClick={() => handleClick(item)}
                            className={clsx(
                                "w-full h-14 border-t border-gray-400 text-left px-3 py-2 flex items-center gap-2",
                                isActive ? "text-white font-bold bg-secondary" : "hover:bg-orange-400"
                            )}
                        >
                            {item.icon} {item.label}
                        </button>
                    )
                })}
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-secondary shadow">
                    <div className="w-full px-4 py-2 mb-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-white">
                            Trang quản trị - <span className="text-orange-500">CinePlus</span>
                        </h1>
                        <div className="text-white text-sm">
                            Welcome, <span className="font-bold">{currentData?.username}</span> |{" "}
                            <button
                                className="hover:underline"
                                onClick={() => navigate(path.HOME)}
                            >
                                View site
                            </button>
                            {" "}|{" "}
                            <button
                                className="hover:underline"
                                onClick={() => navigate(path.CHANGEPASSWORD)}
                            >
                                CHANGE PASSWORD
                            </button>
                            {" "}|{" "}
                            <button
                                className="hover:underline inline-flex items-center gap-1"
                                onClick={() => dispatch(logout())}
                            >
                                LOG OUT
                                {IoLogOutOutline && <IoLogOutOutline/>}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Nội dung */}
                <div className="px-6 pb-10">
                    <Outlet />
                </div>
            </main>
        </div>
  );
};

export default AdminLayout;
