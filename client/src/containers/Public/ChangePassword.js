import React, { useState } from "react";
import { InputField, Button } from "../../components";
import { validateChangePassword} from "../../utils/validation"; 
import { apiChangePassword } from "../../services/user";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ChangePassword = ()=>{

    const navigate = useNavigate();
    const [isChangePassword, setIsChangePassword] = useState(true)
    const [invalidFields, setInvalidFields] = useState([]);
    
    const fields = [
        { name: 'currentPassword', label: 'Mật khẩu hiện tại' },
        { name: 'newPassword', label: 'Mật khẩu mới' },
        { name: 'confirmNewPassword', label: 'Xác minh mật khẩu mới' },
    ];

    const [payload, setPayload] = useState({
        currentPassword: '',
        newPassword: '',
        comfirmNewPassword: '',
    });
    
    const handleInputChange = (e) => {
       const keyPayload = e.target.name;
        setPayload((prev) => ({
          ...prev,
          [keyPayload]: e.target.value,
        }));
    };

    const handleChangePasswordSubmit = async () => {
        try {
            // Reset lỗi trước khi validate
            setInvalidFields([]);
            console.log('ChangePassword - payload:', payload);
            // Validate
            const errors = validateChangePassword(payload);
            if (errors.length > 0) {
                setInvalidFields(errors);
                return;
            }
            const result = await apiChangePassword(payload);
            if (result.err === 0) {
                toast.success(result.msg); // Đổi mật khẩu thành công
                setPayload({
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }); 
                // Chuyển về trang chủ sau 1 giây
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                toast.error(result.msg);  // Mật khẩu cũ sai, nhập thiếu,...
            }
        } catch (error) {
            toast.error("Lỗi không xác định. Vui lòng thử lại sau.");
        }
    };

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
                        type={'password'}
                        key={name}
                        name={name}
                        label={label}
                        value={payload[name]}
                        state={isChangePassword}
                        onChange={handleInputChange}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                )
                )}
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                    text="ĐỔI MẬT KHẨU"
                    bgColor="bg-green-400"
                    textColor="text-black"
                    hover="hover:bg-green-600"
                    onClick={handleChangePasswordSubmit}
                />
            </div>
        </div>
    )
}

export default ChangePassword