import {SelectBox, TitleHeader, ContainerBox, FlexibleInputAd, FormRowAd, Button} from '../../../components';
import { apiGetUserRoles } from '../../../services/user';
import { useEffect, useState } from 'react';
import { useClickMouseOutside } from '../../../hooks';
import { useRef } from 'react';
import { validateRegister } from '../../../utils/validation';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import {path} from '../../../utils/constant'
import { apiCreateUserByAdmin } from '../../../services/user';

const AddUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: { engVal: '', vnVal: '' }
    });

    const [roles, setRoles] = useState([]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const roleRef = useRef(null); // Tham chiếu đến phần tử chứa dropdown
    // Sử dụng useClickMouseOutside để đóng dropdown khi click ra ngoài
    useClickMouseOutside([roleRef], () =>  setOpenDropdown(null));

    useEffect(()=>{
        const fetchRoles = async ()=>{
            const response = await apiGetUserRoles()
            if(response?.err===0){
                setRoles(response.response || []);
            }
        }
        fetchRoles()
    },[])

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
        setInvalidFields(prev => prev.filter(err => err.name !== field));
    };

    const handleSelectRole = (role) => {
        setPayload(prev => ({
            ...prev,
            role: {
                engVal: role.englishValue,
                vnVal: role.vietnameseValue
            }
        }));
        setOpenDropdown(null);
    };

    const handleSubmit = async () => {
        setInvalidFields([]);
        const errors = validateRegister(payload);
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const { role, confirmPassword, ...cleanedPayload } = payload;
        const finalPayload = {
            ...cleanedPayload,
            user_role: payload.role.engVal || 'user'
        };
        const response = await apiCreateUserByAdmin(finalPayload);
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách user sau khi tạo thành công
            dispatch(actions.getUsersList());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.USER_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Thêm người dùng"/>
            </ContainerBox>
            <ContainerBox>
                <FormRowAd label="Loại người dùng">
                    <div className='relative' ref={roleRef}>
                        <SelectBox
                            value={payload.role.vnVal}
                            placeholder="Chọn vai trò"
                            items={roles.map((role) => ({
                                label: role.vietnameseValue,
                                onClick: () => handleSelectRole(role),
                            }))}
                            dropdownKey="userRole"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có vai trò nào"
                        />
                    </div>
                </FormRowAd>
                <FormRowAd label="Tên người dùng">
                    <FlexibleInputAd 
                        value={payload.username} 
                        onChange={(val) => handleChange('username', val)} 
                        error={invalidFields.find(e => e.name === 'username')?.message}
                        keyPayload="username"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Số điện thoại">
                    <FlexibleInputAd 
                        value={payload.phone} 
                        onChange={(val) => handleChange('phone', val)} 
                        error={invalidFields.find(e => e.name === 'phone')?.message}
                        keyPayload="phone"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Email">
                    <FlexibleInputAd 
                        value={payload.email} 
                        onChange={(val) => handleChange('email', val)} 
                        error={invalidFields.find(e => e.name === 'email')?.message}
                        keyPayload="email"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Mật khẩu">
                    <FlexibleInputAd 
                        type="password"
                        value={payload.password} 
                        onChange={(val) => handleChange('password', val)} 
                        error={invalidFields.find(e => e.name === 'password')?.message}
                        keyPayload="password"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Xác nhận mật khẩu">
                    <FlexibleInputAd 
                        type="password"
                        value={payload.confirmPassword} 
                        onChange={(val) => handleChange('confirmPassword', val)} 
                        error={invalidFields.find(e => e.name === 'confirmPassword')?.message}
                        keyPayload="confirmPassword"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <Button
                    text='Submit Form'
                    textColor='text-white'
                    bgColor='bg-green-500'
                    onClick={handleSubmit}
                />
            </ContainerBox>
        </div>
    );
};

export default AddUser;
