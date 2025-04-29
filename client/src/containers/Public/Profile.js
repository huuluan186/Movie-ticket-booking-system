import React  , {useState, useEffect} from 'react';
import { Button, InputField} from '../../components';
import { validateFields } from "../../utils/validation"; 
import * as actions from '../../store/actions'
import { useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
    const dispatch = useDispatch();
    const { currentData, msg, update} = useSelector((state) => state.user);
    const [isUpdateInfo, setIsUpdateInfo] = useState(false)
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
            username: currentData.username || '',
            phone: currentData.phone || '',
            email: currentData.email || '',
            user_role: currentData.user_role || '',
        });
        } else {
        dispatch(actions.getCurrent()); // Gọi API lấy thông tin user
        }
    }, [currentData, dispatch]);

    const handleClickUpdateInfoButton = () => {
        setIsUpdateInfo((prevState) => !prevState);
        setInvalidFields([]); //clear validate error khi nhấn vào
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleConfirmUpdateData = async () => {
        // Chuẩn bị payload, chỉ gửi các trường đã thay đổi
        const payload = {};
        if (formData.username && formData.username !== currentData.username) {
            payload.username = formData.username;
        }
        if (formData.email && formData.email !== currentData.email) {
            payload.email = formData.email;
        }
        if (formData.phone && formData.phone !== currentData.phone) {
            payload.phone = formData.phone;
        }
        console.log('Profile - payload:', payload);
        // Validate
        const errors = validateFields(payload, false, isUpdateInfo);
        setInvalidFields(errors);
        if (errors.length > 0) return;
        const result = await dispatch(actions.updateProfile(payload));
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
            <div className='text-center'>
                <h1 className="text-orange-700 text-3xl font-bold text-center mb-6 inline-block mx-auto">
                THÔNG TIN CÁ NHÂN
                    <div className="relative w-full h-0.5 bg-black mt-3">
                        <div className="absolute inset-0 w-20 h-1.5 bg-orange-400 m-auto z-10"></div>
                    </div>
                </h1>
            </div>

            <div className="space-y-4">
            {fields.map(({ name, label, readOnly }) => (
                <InputField
                    key={name}
                    name={name}
                    label={label}
                    value={formData[name]}
                    onChange={handleInputChange}
                    error={invalidFields.find(err => err.name === name)?.message}
                    readOnly={readOnly}
                    isUpdateInfo={isUpdateInfo}
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