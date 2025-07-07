import {memo} from "react";

const Button = ({ text, textSize, textColor, outline, bgColor,IcAfter, IcBefore, onClick, fullWidth,hover}) => {
  return (
   <div className='relative flex justify-center items-center'>
        <button 
          type="button" 
          className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} ${outline}  ${hover? hover : 'hover:text-orange-500 '} rounded-md hover:${textColor} flex font-medium items-center justify-center gap-2 `} onClick={onClick}
        >
            {IcBefore &&<span className="text-2xl"><IcBefore/></span>}
            <span className={`${textSize ? textSize : ''}`}>{text}</span>
            {IcAfter &&<span className="text-2xl ml-[-8px]"> <IcAfter/></span>}
        </button>
   </div>
  );
};

export default memo(Button);