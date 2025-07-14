import {SelectBox, TitleHeader, ContainerBox, FlexibleInputAd, FormRowAd, Button} from '../../../components';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from '../../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import { apiUpdateCinema } from '../../../services/cinema';
import { useRef } from 'react';
import { useClickMouseOutside } from '../../../hooks';

const UpdateChain = () => {
    const { id: cinemaId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { cinemaDetail, allCinemaClusters} = useSelector(state => state.cinema);
    const [selectedCluster, setSelectedCluster] = useState({ cluster_id: '', cluster_name: '' });
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const clusterRef = useRef(null);
    useClickMouseOutside([clusterRef], () => setOpenDropdown(null));

    const [payload, setPayload] = useState({
        cinema_name: '',
        rowCount: '',
        columnCount: '',
        chain_id:''
    });

    useEffect(() => {
        if (cinemaId) dispatch(actions.getACinemaById(cinemaId));
        dispatch(actions.getAllCinemaClusters());
    }, [cinemaId, dispatch]);

    useEffect(() => {
        if (cinemaDetail) {
            setPayload({
                cinema_name: cinemaDetail?.cinema_name || '',
                rowCount: cinemaDetail?.rowCount || 0,
                columnCount: cinemaDetail?.columnCount || 0,
                cluster_id: cinemaDetail?.['cinema_cluster.cluster_id'] || ''
            });

            setSelectedCluster({
                cluster_id: cinemaDetail?.['cinema_cluster.cluster_id'] || '',
                cluster_name: cinemaDetail?.['cinema_cluster.cluster_name'] || ''
            });
        }
    }, [cinemaDetail]);

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
    };

     const handleSelectCluster = (cluster) => {
        setPayload(prev => ({
            ...prev,
            cluster_id: cluster.cluster_id 
        }));
        setSelectedCluster({
            cluster: cluster.cluster_id,
            cluster_name: cluster.cluster_name
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

        const response = await apiUpdateCinema(cinemaId, payload)
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách user sau khi tạo thành công
            dispatch(actions.getAllCinemas());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.CINEMA_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Cập nhật rạp"/>
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
                <FormRowAd label="Cụm rạp">
                    <div className='relative' ref={clusterRef}>
                        <SelectBox
                            value={selectedCluster.cluster_name}
                            placeholder="Chọn cụm rạp"
                            items={allCinemaClusters.map((item) => ({
                                label: item.cluster_name,
                                onClick: () => handleSelectCluster(item),
                            }))}
                            dropdownKey="cinema"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có cụm rạp nào"
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

export default UpdateChain;
