import React from 'react';
import { Link } from 'react-router-dom';

const FooterColumn = ({ title, items}) => {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">
        <span className="text-white pe-3">|</span> {title}
      </h2>
      <div className="space-y-3 text-gray-300">
        {items.map((item, index) => {
          // Nếu item là link, hiển thị dưới dạng <Link>
          if (item.type === 'link') {
            return (
              <Link
                key={index}
                to={item.to}
                className="hover:text-orange-500 transition-colors block gap-3"
              >
                {item.icon && < item.icon className="inline-block mr-2 text-orange-500" />}
                {item.label}
              </Link>
            );
          }

          // Nếu item là a (cho các liên kết ngoài)
          if (item.type === 'a') {
            return (
              <a
                key={index}
                href={item.href}
                className="hover:text-orange-500 transition-colors block"
              >
                {item.icon && <item.icon className="inline-block mr-2 text-orange-500" />}
                {item.label}
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FooterColumn;
