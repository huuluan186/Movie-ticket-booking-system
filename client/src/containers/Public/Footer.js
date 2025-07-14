import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-dark-transparent-removebg.png';
import teamMembers from '../../utils/teamMembers'; 
import footerData from '../../utils/footerDatas';
import { FooterColumn } from '../../components/index';
const Footer = () => {
    
  return (
    <footer className="bg-neutral-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-12 py-10">
        {/* Logo và Liên hệ */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 border-b border-neutral-800 pb-12">
          {/* Cột Logo */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-6">
               <Link to={'/'}>
                    <img
                        src={logo} 
                        alt="Logo"
                        className="w-full h-[80px] object-contain"
                    />    
               </Link>           
                <div>
                    <h1 className="text-4xl font-bold text-orange-500">CinePlus</h1>
                    <p className="text-gray-300 mt-2">Cinema Experience</p>
                </div>
            </div>
          </div>

          {footerData.map((col, idx) => (
            <FooterColumn key={idx} title={col.title} items={col.items} />
          ))}
         
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
                  {Object.entries(member.links).map(([index, url]) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                      aria-label={`${index} ${member.name}`}
                    >
                       {member.linkIcons?.[index]}
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