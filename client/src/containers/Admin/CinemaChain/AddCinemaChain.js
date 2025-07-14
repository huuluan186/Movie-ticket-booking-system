import {TitleHeader, ContainerBox, FlexibleInputAd, FormRowAd, Button} from '../../../components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import {path} from '../../../utils/constant'
import { apiCreateCinemaChain } from '../../../services/cinema';
import { validateFields } from '../../../utils/validation';

const AddCinemaChain = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        chain_name:'',
        logo: null
    });
    const [invalidFields, setInvalidFields] = useState([]);

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        setInvalidFields([]);
        const fields = [{ name: 'chain_name', label: 'tên chuỗi rạp' }];
        const errors = validateFields(payload, fields);
        if (errors.length > 0) {
            setInvalidFields(errors);
            return;
        }
        const response = await apiCreateCinemaChain(payload);
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách sau khi tạo thành công
            dispatch(actions.getAllCinemaChains());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.CINEMA_CHAIN_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Thêm chuỗi rạp"/>
            </ContainerBox>
            <ContainerBox>
                <FormRowAd label="Tên chuỗi rạp">
                    <FlexibleInputAd 
                        value={payload.chain_name} 
                        onChange={(val) => handleChange('chain_name', val)} 
                        error={invalidFields.find(e => e.name === 'chain_name')?.message}
                        keyPayload="chain_name"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Logo">
                    <FlexibleInputAd 
                        type='file'
                        onChange={(file) => handleChange('logo', file)} 
                        error={invalidFields.find(e => e.name === 'logo')?.message}
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

export default AddCinemaChain;
