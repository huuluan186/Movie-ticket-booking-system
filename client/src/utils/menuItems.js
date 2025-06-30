import icons from './icon'
import * as actions from '../store/actions' 
import {path} from './constant'

const { IoInformationCircleOutline, AiOutlineHistory, IoLogOutOutline, MdOutlineChangeCircle, RiAdminLine } = icons

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
