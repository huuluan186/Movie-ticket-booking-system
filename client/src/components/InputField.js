import { useState } from 'react';
import icons from '../utils/icon';

const { FiEye, FiEyeOff } = icons;

const InputField = ({ type, name, label, value, onChange, readOnly, state=true, invalidFields = [], setInvalidFields}) => {
    const [showPassword, setShowPassword] = useState(false);
    if (state && readOnly) return null; // Đang sửa mà readonly thì bỏ qua không render

    if (!state) {
        // Không sửa thông tin => render 2 cột: label bên trái + giá trị bên phải
        return (
            <div className='space-y-4'>
                <div className="flex items-center justify-between border-b border-blue-500 py-2">
                    <p className="text-black text-md font-semibold">{label}:</p>
                    <p className="p-1 bg-transparent text-black focus:outline-none">{value}</p>
                </div>
            </div>
        );
    }

    const errorMessage = invalidFields?.find(item => item.name === name)?.message;

  // Trường hợp đang update info => cho nhập input
    return (
        <div className="group">
            <label className="text-sm text-gray-500 group-focus-within:text-blue-700 group-focus-within:font-medium">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type === 'password' && showPassword ? 'text' : type || 'text'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={()=> setInvalidFields && setInvalidFields(prev => prev.filter(item => item.name !== name))}
                    className="w-full pb-1 bg-transparent border-b border-blue-500 focus:outline-none"
                />
                {type === 'password' && (
                    <span
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                )}
               
            </div>
            {errorMessage && (<p className="text-red-500 text-xs">{errorMessage}</p>)}
        </div>
    );
};

export default InputField;
