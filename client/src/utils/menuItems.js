import icons from './icon'
import * as actions from '../store/actions'  // Đảm bảo đường dẫn đúng trong thư mục `src`
const { IoInformationCircleOutline, AiOutlineHistory, IoLogOutOutline } = icons

export const userMenuItems = (navigate, dispatch) => [
  {
    label: 'Thông tin tài khoản',
    icon: <IoInformationCircleOutline />,
    onClick: () => navigate('/user-info'),
  },
  {
    label: 'Lịch sử giao dịch',
    icon: <AiOutlineHistory />,
    onClick: () => navigate('/history-transaction'),
  },
  {
    label: 'Đăng xuất',
    icon: <IoLogOutOutline />,
    onClick: () => dispatch(actions.logout()),
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
