import React, {memo, useState} from "react";

const Button = ({ text, textColor, outline, bgColor,IcAfter, IcBefore, onClick, fullWidth,hover}) => {

    
  return (
   <div class='relative'>
        <button 
          type="button" 
          className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} ${outline}  ${hover? hover : 'hover:text-orange-500 '} rounded-md hover:${textColor} flex font-medium items-center justify-center gap-2 `} onClick={onClick}
        >
            <span className="text-2xl">{IcBefore && <IcBefore/>}</span>
            <span>{text}</span>
            <span>{IcAfter && <IcAfter/>}</span>
        </button>
   </div>
  );
};

export default memo(Button);