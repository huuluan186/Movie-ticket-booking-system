import {TitleHeader, ContainerBox, FlexibleInputAd, FormRowAd, Button} from '../../../components';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from '../../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import { apiUpdateCinemaChain } from '../../../services/cinema';
import {validateFields} from '../../../utils/validation'

const UpdateCinemaChain = () => {
    const { id: chainId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { cinemaChainDetail } = useSelector(state => state.cinema);
    const [invalidFields, setInvalidFields] = useState([]);

    const [payload, setPayload] = useState({
        chain_name: '',
        logo: null,
    });

    useEffect(() => {
        if (chainId) dispatch(actions.getACinemaChainById(chainId));
    }, [chainId]);

    // Khi cinemaChainDetail thay đổi, set vào payload
    useEffect(() => {
        if (cinemaChainDetail) {
            setPayload({
                chain_name: cinemaChainDetail.chain_name || '',
                logo: cinemaChainDetail.logo || null,
            });
        }
    }, [cinemaChainDetail]);

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        //có thể bỏ nếu muốn không nhập thì thì payload = thông tin cũ
        setInvalidFields([]);
        const fields = [{ name: 'chain_name', label: 'tên chuỗi rạp' }];
        const errors = validateFields(payload, fields);
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const response = await apiUpdateCinemaChain(chainId, payload)
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách user sau khi tạo thành công
            dispatch(actions.getAllCinemaChains());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.CINEMA_CHAIN_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Cập nhật chuỗi rạp"/>
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
                        value={payload.logo}
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

export default UpdateCinemaChain;
