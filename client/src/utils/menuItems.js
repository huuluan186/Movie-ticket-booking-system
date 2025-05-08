import icons from './icon'
import * as actions from '../store/actions'  // Đảm bảo đường dẫn đúng trong thư mục `src`
import {path} from './constant'

const { IoInformationCircleOutline, AiOutlineHistory, IoLogOutOutline, MdOutlineChangeCircle } = icons

export const userMenuItems = (navigate, dispatch) => [
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
    onClick: () => navigate('/orders'),
  },
  {
    label: 'Đăng xuất',
    icon: <IoLogOutOutline />,
    onClick: () => {
        dispatch(actions.logout());
        navigate('/');
    }    
  }
]
