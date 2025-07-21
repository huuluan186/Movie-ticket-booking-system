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
import { apiCreateCinema } from '../../../services/cinema';

const AddCinema = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cinemaChains, cinemaClusters}= useSelector(state=>state.cinema)
    const [payload, setPayload] = useState({
        cinema_name: '',
        rowCount: '',
        columnCount: '',
        cluster_id:'',
        chain_id: '',
    });

    const [selectedCluster, setSelectedCluster] = useState({ cluster_id: '', cluster_name: '' });
    const [selectedChain, setSelectedChain] = useState({ chain_id: '', chain_name: '' });
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const clusterRef = useRef(null); // Tham chiếu đến phần tử chứa dropdown
    const chainRef = useRef(null)
    // Sử dụng useClickMouseOutside để đóng dropdown khi click ra ngoài
    useClickMouseOutside([clusterRef, chainRef], () =>  setOpenDropdown(null));

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
        setSelectedChain({ chain_id: chain.chain_id, chain_name: chain.chain_name });
        setPayload(prev => ({
            ...prev,
            chain_id: chain.chain_id,
        }));
        dispatch(actions.getCinemaClustersByChainId(chain.chain_id));
        setSelectedCluster({ cluster_id: '', cluster_name: '' }); // Reset cụm rạp khi chọn chuỗi mới
        setOpenDropdown(null);
    };

    const handleSelectCluster = (cluster) => {
        setPayload(prev => ({
            ...prev,
            cluster_id: cluster.cluster_id 
        }));
        setSelectedCluster({
            cluster_id: cluster.cluster_id,
            cluster_name: cluster.cluster_name
        });
        setOpenDropdown(null);
    };

    const handleSubmit = async () => {
        setInvalidFields([]);
        const fields = [
            { name: 'cinema_name', label: 'tên rạp'},
            { name: 'rowCount', label: 'số lượng hàng ghế'},
            { name: 'columnCount', label: 'số lượng cột ghế'},
            { name: 'cluster_id', label: 'cụm rạp',  type: 'select'},
            { name: 'chain_id', label: 'chuỗi rạp',  type: 'select'}
        ];
        const errors = validateFields(payload, fields);
        if (isNaN(payload.rowCount)) {
            errors.push({ name: 'rowCount', message: 'Hàng ghế phải là số' });
        }
        if (isNaN(payload.columnCount)) {
            errors.push({ name: 'columnCount', message: 'Cột ghế phải là số' });
        }
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const { chain_id, ...finalPayload } = payload;
        const response = await apiCreateCinema(finalPayload);
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách sau khi tạo thành công
            dispatch(actions.getAllCinemas());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.CINEMA_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');

    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Thêm rạp"/>
            </ContainerBox>
            <ContainerBox>
                <FormRowAd label="Tên rạp">
                    <FlexibleInputAd 
                        value={payload.cinema_name} 
                        onChange={(val) => handleChange('cinema_name', val)} 
                        error={invalidFields.find(e => e.name === 'cinema_name')?.message}
                        keyPayload="cinema_name"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Số lượng hàng ghế">
                    <FlexibleInputAd 
                        value={payload.rowCount} 
                        onChange={(val) => handleChange('rowCount', val)} 
                        error={invalidFields.find(e => e.name === 'rowCount')?.message}
                        keyPayload="rowCount"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Số lượng cột ghế">
                    <FlexibleInputAd 
                        value={payload.columnCount} 
                        onChange={(val) => handleChange('columnCount', val)} 
                        error={invalidFields.find(e => e.name === 'columnCount')?.message}
                        keyPayload="columnCount"
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
                <FormRowAd label="Cụm rạp">
                    <div className='relative' ref={clusterRef}>
                        <SelectBox
                            value={selectedCluster.cluster_name}
                            placeholder="Chọn cụm rạp"
                            items={cinemaClusters.map((item) => ({
                                label: item.cluster_name,
                                onClick: () => handleSelectCluster(item),
                            }))}
                            dropdownKey="cinemaCluster"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có cụm rạp nào"
                            error={invalidFields.find(e => e.name === 'cluster_id')?.message}
                            keyPayload="cluster_id"
                            setInvalidFields={setInvalidFields}
                            disabled={!selectedChain.chain_id}
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

export default AddCinema;
