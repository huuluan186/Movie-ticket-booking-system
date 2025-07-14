import {SelectBox, TitleHeader, ContainerBox, FlexibleInputAd, FormRowAd, Button} from '../../../components';
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClickMouseOutside } from '../../../hooks';
import { toast } from 'react-toastify';
import { path } from '../../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import { apiGetUserRoles } from '../../../services/user';
import {validateUpdateInfo} from '../../../utils/validation'

const UpdateUser = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { usersListData } = useSelector(state => state.user);
    const [roles, setRoles] = useState([]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const roleRef = useRef(null);
    useClickMouseOutside([roleRef], () => setOpenDropdown(null));

    const [payload, setPayload] = useState({
        username: '',
        phone: '',
        email: '',
        role: { engVal: '', vnVal: '' }
    });

    useEffect(()=>{
        const fetchRoles = async ()=>{
            const response = await apiGetUserRoles()
            if(response?.err===0){
                setRoles(response.response || []);
            }
        }
        fetchRoles()
    },[])

    useEffect(() => {
        if (usersListData?.rows?.length > 0 && roles.length > 0) {
            const foundUser = usersListData.rows.find(user => user.user_id === userId);
            if (foundUser) {
                setPayload({
                    username: foundUser.username,
                    phone: foundUser.phone,
                    email: foundUser.email,
                    role: {
                        engVal: foundUser.user_role,
                        vnVal: roles.find(r => r.englishValue === foundUser.user_role)?.vietnameseValue || ''
                    }
                });
            } else {
                toast.error('Không tìm thấy người dùng');
            }
        }
    }, [userId, usersListData, roles]);

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
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
        const errors = validateUpdateInfo(payload);
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const finalPayload = {
            user_id: userId,
            username: payload.username,
            phone: payload.phone,
            email: payload.email,
            user_role: payload.role.engVal || 'user'
        };
        const response = await dispatch(actions.adminUpdateUser(userId, finalPayload));
        if (response?.success) {
            toast.success(response.message);
            //Fetch lại danh sách user sau khi tạo thành công
            dispatch(actions.getUsersList());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.USER_MANAGER}`);
            }, 500);
        } else toast.warning(response?.message || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Cập nhật người dùng"/>
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

export default UpdateUser;
