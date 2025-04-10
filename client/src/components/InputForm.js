import React, { useState } from "react";

const InputForm = ({ label,type,value,setValue,keyPayload}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [showText, setShowText] = useState(true);

    const shouldFloat = isFocused || value;

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            setShowText(false); // Ẩn chữ
            setTimeout(() => setShowText(true), 200); // Hiện lại sau khi label trượt xong
        }
    };
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
                type={type || 'text'}
                //placeholder={currentPlaceholder}
                //className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={value}
                onChange={(e)=>setValue(prev => ({...prev,[keyPayload]:e.target.value}))}                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                placeholder=""
                className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors duration-200
                    ${!showText ? "text-transparent" : "text-black"}`}
            />
        </div>
    );
};

export default InputForm;