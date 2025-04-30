import React, { useState } from "react";
import { InputField } from "../../components";
import { useLocation } from 'react-router-dom';

const ChangePassword = ()=>{

    const [isChangePassword, setIsChangePassword] = useState(true)
    const fields = [
        { name: 'currentPassword', label: 'Mật khẩu hiện tại' },
        { name: 'newPassword', label: 'Mật khẩu mới' },
        { name: 'confirmNewPassword', label: 'Xác minh mật khẩu mới' },
    ];
    return(
        <div className="w-full m-auto max-w-md py-10">
            <div className='text-center'>
                <h1 className="text-orange-700 text-3xl font-bold text-center mb-6 inline-block mx-auto">
                ĐỔI MẬT KHẨU
                    <div className="relative w-full h-0.5 bg-black mt-3">
                        <div className="absolute inset-0 w-20 h-1.5 bg-orange-400 m-auto z-10"></div>
                    </div>
                </h1>
            </div>
            <div className="space-y-4">
                {fields.map( ({name, label}) => (
                    <InputField
                        key={name}
                        name={name}
                        label={label}
                        value=''
                        state={isChangePassword}
                        //onChange={handleInputChange}
                        //error={invalidFields.find(err => err.name === name)?.message}
                    />
                )
                )}
            </div>
        </div>
    )
}

export default ChangePassword