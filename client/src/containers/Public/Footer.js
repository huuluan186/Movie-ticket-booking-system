import React from 'react';
import logo from '../../assets/logo-dark-transparent-removebg.png';
import icons from '../../utils/icon';

const { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaFacebook } = icons;

const Footer = () => {
  const teamMembers = [
    {
      name: 'Phạm Hữu Luân',    
      links: {
        github: '#',
        facebook: '#'
      }
    },
    {
      name: 'Nguyễn Hữu Anh',
      links: {
        github: '#',
        facebook: '#'
      }
    },
    {
      name: 'Lâm Thanh Đỉnh',
      links: {
        github: '#',
        facebook: '#'
      }
    }
  ];

  return (
    <footer className="bg-neutral-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Logo và Liên hệ */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 border-b border-neutral-800 pb-12">
          {/* Cột Logo */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-6">
                <img
                    src={logo} 
                    alt="Logo"
                    className="w-full h-[80px] object-contain"
                />               
                <div>
                    <h1 className="text-4xl font-bold text-orange-500">CinePlus</h1>
                    <p className="text-gray-300 mt-2">Cinema Experience</p>
                </div>
            </div>
          </div>

            {/* Cột Điều khoản sử dụng */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-2xl font-bold text-orange-500 mb-6"><span className='text-white pe-2'>|</span> Điều khoản sử dụng</h2>
            <div className="space-y-3 text-gray-300 ">
                <a href="#" className="hover:text-orange-500 transition-colors block gap-3">
                  Điều khoản chung
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors block">
                  Điều khoản sử dụng
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors block">
                  Chính sách thanh toán
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors block">
                  Câu hỏi thường gặp
                </a>

            </div>
          </div>

          {/* Cột Danh mục */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-2xl font-bold text-orange-500 mb-6"><span className='text-white pe-3'>|</span>Danh mục</h2>
            <div className="space-y-3 text-gray-300 ">
                <a href="#" className="hover:text-orange-500 transition-colors block gap-3">
                  Phim đang chiếu
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors block">
                  Phim sắp chiếu
                </a>
            </div>
          </div>

          {/* Cột Liên hệ */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-2xl font-bold text-orange-500 mb-6"><span className='text-white pe-3'>|</span>Liên Hệ</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-500 text-xl" />
                <p>126 Nguyễn Thiện Thành, Phường 5, Tp. Trà Vinh</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-orange-500 text-xl" />
                <a href="tel:+84123456789" className="hover:text-orange-500 transition-colors">
                  0123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-orange-500 text-xl" />
                <a href="mailto:contact@moviecap.com" className="hover:text-orange-500 transition-colors">
                  contact@cineplus.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Về Chúng Tôi - Compact Version */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Về Chúng Tôi</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="md:w-[300px] bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700 transition-colors text-center"
              >
                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                <p className="text-md text-gray-400 mb-2">{member.role}</p>
                <div className="flex justify-center gap-5">
                  {Object.entries(member.links).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                      aria-label={`${platform} ${member.name}`}
                    >
                      {platform === 'github' && <FaGithub className="w-7 h-7" />}
                      {platform === 'facebook' && <FaFacebook className="w-7 h-7" />}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 border-t border-neutral-800 pt-5 h-[20px]">
          <p>© {new Date().getFullYear()} Cine+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;