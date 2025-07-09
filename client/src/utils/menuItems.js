import icons from './icon'
import * as actions from '../store/actions' 
import {path} from './constant'

const { 
    IoInformationCircleOutline, AiOutlineHistory, IoLogOutOutline, MdOutlineChangeCircle, RiAdminLine, GrAnalytics, FaUser, MdLocalMovies, FaCalendarAlt, SiChainlink, AiOutlineCluster, GiTheater 
} = icons

export const userMenuItems = (navigate, dispatch, user_role) => [
    // Nếu là admin thì thêm mục này
    ...(user_role === 'admin' 
    ? [
        {
            label: 'Trang quản trị',
            icon: <RiAdminLine />,
            onClick: () => navigate(path.ADMIN),
        }
    ] : 
    []),
    {
        label: 'Thông tin tài khoản',
        icon: <IoInformationCircleOutline />,
        onClick: () => navigate(path.PROFILE),
    },
    {
        label: 'Đổi mật khẩu',
        icon: <MdOutlineChangeCircle/>,
        onClick: () => navigate(path.CHANGEPASSWORD),
    },
    {
        label: 'Lịch sử giao dịch',
        icon: <AiOutlineHistory />,
        onClick: () => {
            navigate(path.MY_TICKET);
            dispatch(actions.getOrderHistory());
        }
    },
    {
        label: 'Đăng xuất',
        icon: <IoLogOutOutline />,
        onClick: () => {
            dispatch(actions.logout());
            navigate(path.HOME);
        }    
    }
]

export const adminSidebarItems = [
    { label: "Thống kê", to: `${path.ADMIN}/${path.DASHBOARD}`, icon: <GrAnalytics/>},
    { label: "Quản lý người dùng", to: `${path.ADMIN}/${path.USER_MANAGER}`, icon: <FaUser/>},
    { label: "Quản lý hệ thống rạp", to: `${path.ADMIN}/${path.CINEMA_CHAIN_MANAGER}`, icon: <SiChainlink/>},
    { label: "Quản lý cụm rạp", to: `${path.ADMIN}/${path.CINEMA_CLUSTER_MANAGER}`, icon: <AiOutlineCluster/>},
    { label: "Quản lý rạp", to: `${path.ADMIN}/${path.CINEMA_MANAGER}`, icon: <GiTheater/> },
    { label: "Quản lý phim", to: `${path.ADMIN}/${path.MOVIE_MANAGER}`, icon: <MdLocalMovies/> },
    { label: "Quản lý suất chiếu", to: `${path.ADMIN}/${path.SHOWTIME_MANAGER}`, icon: <FaCalendarAlt/> },
];