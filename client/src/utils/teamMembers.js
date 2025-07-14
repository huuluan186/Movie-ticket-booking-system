import icons from './icon'

const {FaGithub, FaFacebook } = icons;

const teamMembers = [
    {
      name: 'Phạm Hữu Luân',    
      links: {
        github: 'https://github.com/huuluan186',
        facebook: 'https://www.facebook.com/huu.luan.791758'
      },
      linkIcons: {
        github: <FaGithub className="w-7 h-7" />,
        facebook: <FaFacebook className="w-7 h-7" />
      }
    },
    {
      name: 'Nguyễn Hữu Anh',
      links: {
        github: '#',
        facebook: '#'
      },
      linkIcons: {
        github: <FaGithub className="w-7 h-7" />,
        facebook: <FaFacebook className="w-7 h-7" />
      }
    },
    {
      name: 'Lâm Thanh Đỉnh',
      links: {
        github: 'https://github.com/LamThanhDinh',
        facebook: 'https://www.facebook.com/nottdd/'
      },
      linkIcons: {
        github: <FaGithub className="w-7 h-7" />,
        facebook: <FaFacebook className="w-7 h-7" />
      }
    }
  ];

export default teamMembers;