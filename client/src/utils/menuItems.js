import icons from './icon'
import * as actions from '../store/actions'  // Đảm bảo đường dẫn đúng trong thư mục `src`

const { IoInformationCircleOutline, AiOutlineHistory, IoLogOutOutline, MdOutlineChangeCircle } = icons

export const userMenuItems = (navigate, dispatch, currentData) => [
  {
    label: 'Thông tin tài khoản',
    icon: <IoInformationCircleOutline />,
    onClick: () => navigate(`/profile/${currentData?.user_id || ''}`),
  },
  {
    label: 'Đổi mật khẩu',
    icon: <MdOutlineChangeCircle/>,
    onClick: () => navigate(`/change-password/${currentData?.user_id || ''}`),
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

export const movieMenuItems = (navigate) => [
  {
    label: 'Phim đang chiếu',
    onClick: () => navigate('/now-showing'),
  },
  {
    label: 'Phim sắp chiếu',
    onClick: () => navigate('/coming-soon'),
  }
]
