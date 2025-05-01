import React from 'react';

const InputField = ({ type, name, label, value, onChange, error, readOnly, state=true }) => {
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

  // Trường hợp đang update info => cho nhập input
  return (
    <div className="group">
      <label className="text-sm text-gray-500 group-focus-within:text-blue-700 group-focus-within:font-medium">
        {label}
      </label>
      <>
        <input
          type={type ? type : 'text'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pb-1 bg-transparent border-b border-blue-500 focus:outline-none"
        />
        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}
      </>
    </div>
  );
};

export default InputField;
