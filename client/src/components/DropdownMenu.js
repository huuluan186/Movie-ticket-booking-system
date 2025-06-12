import React from 'react';

const DropdownMenu = ({ items, onClose, textColor }) => {
  return (
    <div className={`absolute left-0 -translate-x-6 mt-2 w-48 shadow-md rounded-md bg-white z-50 ${textColor}`}>
      <ul className="flex flex-col border border-gray-500 shadow-sm rounded-md" onClick={onClose}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`px-4 py-2 hover:text-orange-700 cursor-pointer ${
              index !== items.length - 1 ? 'border-b border-gray-300' : ''
            }`}
            onClick={item.onClick}
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              {item.icon}
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
