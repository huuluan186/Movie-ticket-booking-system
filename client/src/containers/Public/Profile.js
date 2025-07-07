import { useState, useEffect } from 'react';
import { Button, InputField, TitleHeader } from '../../components';
import { validateUpdateInfo } from "../../utils/validation";
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
    const dispatch = useDispatch();
    const { currentData } = useSelector((state) => state.user);
    const [isUpdateInfo, setIsUpdateInfo] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);

    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        user_role: '',
    });

    // Cập nhật formData khi currentData thay đổi
    useEffect(() => {
        if (currentData && Object.keys(currentData).length > 0) {
            setFormData({
                username: currentData.username.trim() || '',
                phone: currentData.phone.trim() || '',
                email: currentData.email.trim() || '',
                user_role: currentData.user_role || '',
            });
        } else {
            dispatch(actions.getCurrent()); // Gọi API lấy thông tin user
        }
    }, [currentData, dispatch]);

    const handleClickUpdateInfoButton = () => {
        setIsUpdateInfo((prevState) => {
            // Nếu đang ở trạng thái chỉnh sửa (prevState = true) và nhấn HỦY
            if (prevState) {
                // Reset formData về giá trị ban đầu từ currentData
                setFormData({
                    username: currentData.username.trim() || '',
                    phone: currentData.phone.trim() || '',
                    email: currentData.email.trim() || '',
                    user_role: currentData.user_role || '',
                });
            }
            return !prevState; // Đảo ngược trạng thái isUpdateInfo
        });
        setInvalidFields([]); // Clear lỗi validate
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleConfirmUpdateData = async () => {
        // Reset lỗi trước khi validate
        setInvalidFields([]);
        console.log('Profile - payload:', formData);
        // Validate
        const errors = validateUpdateInfo(formData);
        if (errors.length > 0) {
            setInvalidFields(errors);
            return;
        }
        const result = await dispatch(actions.updateProfile(formData));
        if (result.success) {
            toast.success(result.message || "Cập nhật thành công!");
            setIsUpdateInfo(false);
        } else {
            toast.error(result.message || "Cập nhật thất bại!");
        }
    };

    const fields = [
        { name: 'username', label: 'Họ và tên' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Số điện thoại' },
        { name: 'user_role', label: 'Loại tài khoản', readOnly: true },
    ];

    return (
        <div className="w-full m-auto max-w-md py-10">
            <TitleHeader title={'thông tin cá nhân'} variant="underline"/>
            <div className="space-y-4">
                {fields.map(({ name, label, readOnly }) => (
                    <InputField
                        key={name}
                        name={name}
                        label={label}
                        value={formData[name]}
                        onChange={handleInputChange}
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields}
                        readOnly={readOnly}
                        state={isUpdateInfo}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
                {isUpdateInfo &&
                    <Button
                        text="HỦY"
                        bgColor="bg-red-400"
                        textColor="text-black"
                        hover="hover:bg-red-600"
                        onClick={handleClickUpdateInfoButton}
                    />
                }
                <Button
                    text={isUpdateInfo ? "CẬP NHẬT" : "CẬP NHẬT THÔNG TIN"}
                    bgColor="bg-green-400"
                    textColor="text-black"
                    hover="hover:bg-green-600"
                    onClick={isUpdateInfo ? handleConfirmUpdateData : handleClickUpdateInfoButton}
                />
            </div>
        </div>
    );
};

export default Profile;