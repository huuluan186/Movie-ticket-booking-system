import {SelectBox, TitleHeader, ContainerBox, FlexibleInputAd, FormRowAd, Button} from '../../../components';
import { useEffect, useState } from 'react';
import { useClickMouseOutside } from '../../../hooks';
import { useRef } from 'react';
import { validateFields } from '../../../utils/validation';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import {path} from '../../../utils/constant'
import { apiCreateCinemaCluster } from '../../../services/cinema';

const AddCinemaCluster = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {cinemaChains}= useSelector(state=>state.cinema)
    const [payload, setPayload] = useState({
        cluster_name: '',
        address: '',
        chain_id: '',
    });
    const [selectedChain, setSelectedChain] = useState({ chain_id: '', chain_name: '' });
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const chainRef = useRef(null); // Tham chiếu đến phần tử chứa dropdown
    // Sử dụng useClickMouseOutside để đóng dropdown khi click ra ngoài
    useClickMouseOutside([chainRef], () =>  setOpenDropdown(null));

    useEffect(() => {
        dispatch(actions.getAllCinemaChains());
    }, [dispatch]);

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
        setInvalidFields(prev => prev.filter(err => err.name !== field));
    };

    const handleSelectChain = (chain) => {
        setPayload(prev => ({
            ...prev,
            chain_id: chain.chain_id // Thêm chain_id vào payload để submit
        }));
        setSelectedChain({
            chain_id: chain.chain_id,
            chain_name: chain.chain_name
        });
        setOpenDropdown(null);
    };

    const handleSubmit = async () => {
        setInvalidFields([]);
        const fields = [
            { name: 'chain_id', label: 'tên chuỗi rạp', type: 'select'},
            { name: 'cluster_name', label: 'tên cụm rạp'}
        ];
        const errors = validateFields(payload, fields);
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const response = await apiCreateCinemaCluster(payload);
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách sau khi tạo thành công
            dispatch(actions.getAllCinemaClusters());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.CINEMA_CLUSTER_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');

    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Thêm cụm rạp"/>
            </ContainerBox>
            <ContainerBox>
                <FormRowAd label="Tên cụm rạp">
                    <FlexibleInputAd 
                        value={payload.cluster_name} 
                        onChange={(val) => handleChange('cluster_name', val)} 
                        error={invalidFields.find(e => e.name === 'cluster_name')?.message}
                        keyPayload="cluster_name"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Địa chỉ">
                    <FlexibleInputAd 
                        value={payload.address} 
                        onChange={(val) => handleChange('address', val)} 
                        error={invalidFields.find(e => e.name === 'address')?.message}
                        keyPayload="address"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Chuỗi rạp">
                    <div className='relative' ref={chainRef}>
                        <SelectBox
                            value={selectedChain.chain_name}
                            placeholder="Chọn chuỗi rạp"
                            items={cinemaChains.map((item) => ({
                                label: item.chain_name,
                                onClick: () => handleSelectChain(item),
                            }))}
                            dropdownKey="cinemaChain"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có chuỗi rạp nào"
                            error={invalidFields.find(e => e.name === 'chain_id')?.message}
                            keyPayload="chain_id"
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
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

export default AddCinemaCluster;
