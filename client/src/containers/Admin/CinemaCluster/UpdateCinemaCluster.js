import {SelectBox, TitleHeader, ContainerBox, FlexibleInputAd, FormRowAd, Button} from '../../../components';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from '../../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import { apiUpdateCinemaCluster } from '../../../services/cinema';
import {validateFields} from '../../../utils/validation'
import { useRef } from 'react';
import { useClickMouseOutside } from '../../../hooks';

const UpdateCinemaChain = () => {
    const { id: clusterId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { cinemaClusterDetail, cinemaChains} = useSelector(state => state.cinema);
    const [selectedChain, setSelectedChain] = useState({ chain_id: '', chain_name: '' });
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const chainRef = useRef(null);
    useClickMouseOutside([chainRef], () => setOpenDropdown(null));

    const [payload, setPayload] = useState({
        cluster_name: '',
        address:'',
        chain_id: '',
    });

    useEffect(() => {
        if (clusterId) dispatch(actions.getACinemaClusterById(clusterId));
        dispatch(actions.getAllCinemaChains());
    }, [clusterId, dispatch]);

    useEffect(() => {
        if (cinemaClusterDetail) {
            setPayload({
                cluster_name: cinemaClusterDetail?.cluster_name || '',
                address: cinemaClusterDetail?.address || '',
                chain_id: cinemaClusterDetail?.['cinema_chain.chain_id'] || ''
            });

            setSelectedChain({
                chain_id: cinemaClusterDetail?.["cinema_chain.chain_id"] || '',
                chain_name: cinemaClusterDetail?.["cinema_chain.chain_name"] || '',
            });
        }
    }, [cinemaClusterDetail]);

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
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
        //có thể bỏ nếu muốn không nhập thì thì payload = thông tin cũ
        // setInvalidFields([]);
        // const fields = [
        //     { name: 'chain_id', label: 'tên chuỗi rạp', type: 'select'},
        //     { name: 'cluster_name', label: 'tên cụm rạp'}
        // ];
        // const errors = validateFields(payload, fields);
        // setInvalidFields(errors);
        // if (errors.length > 0) return;

        const response = await apiUpdateCinemaCluster(clusterId, payload)
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách user sau khi tạo thành công
            dispatch(actions.getAllCinemaClusters());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.CINEMA_CLUSTER_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Cập nhật cụm rạp"/>
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
                            dropdownKey="cinemaCluster"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có chuỗi rạp nào"
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

export default UpdateCinemaChain;
