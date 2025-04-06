import React, { useState } from "react";

const InputForm = ({ label }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [currentPlaceholder, setCurrentPlaceholder] = useState(label);
    return (
        <div className="relative w-full rounded-md">
            {/* Label nằm trên input */}
            <label
                className={`absolute left-2 transition-all duration-200 ${
                    isFocused ? "-top-3 text-sm text-orange-500" : "top-2 text-gray-400"
                } bg-white px-1`}
            >
                {label}
            </label>
            <input
                type="text"
                placeholder={currentPlaceholder}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                onFocus={() => {
                    setIsFocused(true);
                    setCurrentPlaceholder("");
                }} // Khi input được focus
                onBlur={(e) => {
                    if (!e.target.value) {
                        setIsFocused(false);
                        setCurrentPlaceholder(label); // Khôi phục placeholder khi mất focus và không có giá trị
                    }
                }}
            />
        </div>
    );
};

export default InputForm;