import { useState } from "react";
import icons from '../utils/icon';

const { FiEye, FiEyeOff } = icons;

const InputForm = ({ label,type,value,setValue,keyPayload, invalidFields = [], setInvalidFields, onKeyDown}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [showText, setShowText] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const shouldFloat = isFocused || value;

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            setShowText(false); // Ẩn chữ
            setTimeout(() => setShowText(true), 200); // Hiện lại sau khi label trượt xong
        }
    };

    const errorMessage = invalidFields?.find(item => item.name === keyPayload)?.message;

    return (
        <div className="relative w-full rounded-md">
            {/* Label nằm trên input */}
            <label
                className={`absolute left-2 transition-all duration-200 bg-white px-1 pointer-events-none ${
                    shouldFloat ? "-top-3 text-sm text-orange-500" : "top-2 text-gray-400"}`}
            >
                {label}
            </label>
            <input
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                value={value}
                onChange={(e)=>setValue(prev => ({...prev,[keyPayload]:e.target.value}))}                
                onFocus={() => {
                    setIsFocused(true);
                    setInvalidFields && setInvalidFields(prev => prev.filter(item => item.name !== keyPayload));
                }
                }
                onBlur={handleBlur}
                placeholder=""
                className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors duration-200
                    ${!showText ? "text-transparent" : "text-black"}`
                }
                onKeyDown={onKeyDown}
            />
            {type === 'password' && (
                <div
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
            )}
            {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
};

export default InputForm;