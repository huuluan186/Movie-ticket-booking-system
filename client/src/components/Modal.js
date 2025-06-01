import { memo } from 'react';
import {Button} from './index'
const Modal = ({ isOpen, title, message, buttons, icon: Icon }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[80vw] sm:max-w-[400px] max-h-[90vh] sm:max-h-[500px] overflow-y-auto">
                <div className="flex flex-col items-center">
                    {Icon && (
                    <span className="text-[80px] sm:text-[100px] mb-4 sm:mb-6 text-orange-500 animate-icon-appear">
                        <Icon />
                    </span>
                    )}
                    <h3 className="text-base sm:text-lg font-semibold text-black mb-2 text-center">{title}</h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">{message}</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
                        {buttons.map((button, index) => (
                        <Button
                            key={index}
                            text={button.text}
                            textColor={button.textColor}
                            bgColor={button.bgColor}
                            outline={button.outline}
                            hover={button.hover}
                            onClick={button.onClick}
                            fullWidth={button.fullWidth}
                            IcBefore={button.IcBefore}
                            IcAfter={button.IcAfter}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Modal);