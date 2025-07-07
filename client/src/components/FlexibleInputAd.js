import { useState, useEffect } from 'react';
import icons from '../utils/icon';

const { FiEye, FiEyeOff } = icons;

const FlexibleInput = ({
    type = 'text', // 'text' | 'textarea' | 'file' | 'password'
    value,
    onChange,
    placeholder = '',
    error = '',
    keyPayload = '',
    setInvalidFields = null,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [fileName, setFileName] = useState('');

    const inputBaseClass = "w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300";

    const errorClass = error ? 'border-red-500 ring-red-300' : '';
    const errorMessage = error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
    );
    const handleFocus = () => {
        if (setInvalidFields && keyPayload) {
            setInvalidFields(prev => prev.filter(err => err.name !== keyPayload));
        }
    };

    useEffect(() => {
        if (type === 'file' && typeof value === 'string') {
            // Nếu giá trị là URL, lấy tên file để hiển thị
            setFileName(value);
        }
    }, [value]);

    if (type === 'textarea') {
        return (
           <>
                <textarea
                    className={`${inputBaseClass} ${errorClass}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={handleFocus}
                    rows={5}
                />
                {errorMessage}
           </>
        );
    }

    if (type === 'file') {
        const handleFileChange = (e) => {
            const file = e.target.files?.[0];
            setFileName(file?.name || '');
            onChange(file); // gửi event ra ngoài
        };
        const handleClearFile = () => {
            setFileName('');
            onChange(null); // Reset lại trong payload
        };
       
        return (
            <>
                <div className={`relative ${errorClass}`}>
                    <input
                        type="text"
                        value={fileName}
                        readOnly
                        placeholder={placeholder}
                        className={`${inputBaseClass} pr-32 bg-gray-100 cursor-default`} 
                        onFocus={handleFocus}          
                    />
                    <div className="absolute top-0 right-0 h-full flex items-center">
                        {fileName && (
                        <div
                            className="text-red-500 px-2 cursor-pointer hover:text-red-700 font-bold"
                            onClick={handleClearFile}
                        >
                            ❌
                        </div>
                    )}
                        <label className="h-full flex items-center px-4 bg-gray-400 hover:bg-blue-500 text-white text-sm font-medium rounded-r-md cursor-pointer">
                            Chọn tệp
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange} 
                            />
                        </label>
                </div>
            </div>
                {errorMessage}
            </>
        );
    }

    if (type === 'password') {
        return (
            <>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`${inputBaseClass} ${errorClass} pr-10`}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={handleFocus}
                    />
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>
                {errorMessage}
            </>
        );
    }

    return (
        <>
            <input
                type="text"
                className={`${inputBaseClass} ${errorClass}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={handleFocus}
            />
            {errorMessage}
        </>
    );
};

export default FlexibleInput;
