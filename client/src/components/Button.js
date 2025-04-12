import React, {memo, useState} from "react";

const Button = ({ text, textColor, outline, bgColor,IcAfter, IcBefore, onClick, fullWidth, dropdownItems,hover}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleButtonClick = () => {
        if (dropdownItems) {
          setIsDropdownOpen(!isDropdownOpen);
        }
        if (onClick) {
          onClick();
        }
      };
  return (
   <div class='relative'>
        <button 
          type="button" 
          className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} ${outline}  ${hover? hover : 'hover:text-orange-500 '} rounded-md hover:${textColor} flex font-medium items-center justify-center gap-2 onClick={handleButtonClick} `} onClick={onClick}
        >
            <span className="text-2xl">{IcBefore && <IcBefore/>}</span>
            <span>{text}</span>
            <span>{IcAfter && <IcAfter/>}</span>
        </button>
        {dropdownItems && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
          <ul className="flex flex-col">
            {dropdownItems.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:text-orange-700  cursor-pointer"
                onClick={item.onClick}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
   </div>
  );
};

export default memo(Button);