import icons from './icon'
import * as actions from '../store/actions'  // Đảm bảo đường dẫn đúng trong thư mục `src`

const { IoInformationCircleOutline, AiOutlineHistory, IoLogOutOutline, MdOutlineChangeCircle } = icons

export const userMenuItems = (navigate, dispatch, currentData) => [
  {
    label: 'Thông tin tài khoản',
    icon: <IoInformationCircleOutline />,
    onClick: () => navigate(`/profile/${currentData?.username || ''}`),
  },
  {
    label: 'Đổi mật khẩu',
    icon: <MdOutlineChangeCircle/>,
    onClick: () => navigate(`/change-password/${currentData?.username || ''}`),
  },
  {
    label: 'Lịch sử giao dịch',
    icon: <AiOutlineHistory />,
    onClick: () => navigate('/history-transaction'),
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
