import icons from './icon'
import { path } from './constant';
const { FaPhone, FaEnvelope, FaMapMarkerAlt } = icons;

const footerData = [
    {
      title: 'Điều Khoản Sử Dụng',
      items: [
        { type: 'a', href: '/', label: 'Điều khoản chung' },
        { type: 'a', href: '/', label: 'Điều khoản sử dụng' },
        { type: 'a', href: '/', label: 'Chính sách thanh toán' },
        { type: 'a', href: '/', label: 'Câu hỏi thường gặp' },
      ]
    },
    {
      title: 'Danh Mục',
      items: [
        { type: 'link', to: path.MOVIES_BY_STATUS.replace(':statusSlug', 'now-showing'), label: 'Phim đang chiếu' },
        { type: 'link', to: path.MOVIES_BY_STATUS.replace(':statusSlug', 'coming-soon'), label: 'Phim sắp chiếu' },
      ]
    },
    {
      title: 'Liên Hệ',
      items: [
        {
            type:'a',  
            icon: FaMapMarkerAlt,
            label: '126 Nguyễn Thiện Thành, Phường 5, Tp. Trà Vinh',
        },
        {
            type:'a',  
            icon: FaPhone,
            label: '0123 456 789',
            href: 'tel:+84123456789',
        },
        {
            type:'a',
            icon: FaEnvelope,
            label: 'contact@moviecap.com',
            href: 'mailto:contact@cineplus.com',
        },
        ]
    }    
]

export default footerData;