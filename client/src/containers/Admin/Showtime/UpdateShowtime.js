import {SelectBox, TitleHeader, ContainerBox, FlexibleInputAd, FlexibleDatePickerAd ,FormRowAd, Button} from '../../../components';
import { useEffect, useState } from 'react';
import { useClickMouseOutside } from '../../../hooks';
import { useRef } from 'react';
import { validateFields } from '../../../utils/validation';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import {path} from '../../../utils/constant'
import { apiUpdateShowtime } from '../../../services/showtime';

const UpdateShowtime = () => {
    const { id: showtimeId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cinemaChains, cinemaClusters, cinemas } = useSelector(state => state.cinema);
    const { showtimeDetail } = useSelector(state => state.showtime);
    const { moviesData } = useSelector(state => state.movie);
    const [payload, setPayload] = useState({
        movie_id:'',
        cinema_id: '',
        showtime_date:'',
        showtime_starttime:'',
        showtime_endtime:'',
        price:'',
        chain_id:'', // để hiện lỗi, bỏ ra khi lấy finalpayload
        cluster_id:'', // để hiện lỗi, bỏ ra khi lấy finalpayload
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState({ id: '', title: '' });
    const [selectedChain, setSelectedChain] = useState({ id: '', name: '' });
    const [selectedCluster, setSelectedCluster] = useState({ id: '', name: '' });
    const [selectedCinema, setSelectedCinema] = useState({ id: '', name: '' });

    const movieRef = useRef(null);
    const chainRef = useRef(null);
    const clusterRef = useRef(null);
    const cinemaRef = useRef(null);
    const datetimeRef = useRef(null);

    // Sử dụng useClickMouseOutside để đóng dropdown khi click ra ngoài
    useClickMouseOutside( [movieRef, chainRef, clusterRef, cinemaRef, datetimeRef], 
        () => setOpenDropdown(null)
    );

    useEffect(() => {
        if (showtimeId) dispatch(actions.getShowtimeDetailById(showtimeId))
        dispatch(actions.getAllCinemaChains());
        dispatch(actions.getMovieList());
    }, [dispatch]);

    useEffect(() => {
        if (showtimeDetail) {
            setPayload({
                movie_id: showtimeDetail?.movie_id || '',
                cinema_id: showtimeDetail?.cinema_id || '',
                cluster_id: showtimeDetail?.cinema?.cluster_id || '',
                chain_id: showtimeDetail?.cinema?.cinema_cluster?.chain_id || '',
                showtime_date: showtimeDetail?.showtime_date || '',
                showtime_starttime: (showtimeDetail?.showtime_starttime).slice(0, 5),
                showtime_endtime: (showtimeDetail?.showtime_endtime).slice(0, 5),
                price: parseFloat(showtimeDetail?.price).toLocaleString()
            });
            setSelectedMovie({
                id: showtimeDetail?.movie_id || '',
                title: showtimeDetail?.movie?.title || ''
            });
            setSelectedChain({
                id: showtimeDetail?.cinema?.cinema_cluster?.chain_id  || '',
                name: showtimeDetail?.cinema?.cinema_cluster?.cinema_chain?.chain_name || ''
            });
            setSelectedCluster({
                id: showtimeDetail?.cinema?.cluster_id || '',
                name: showtimeDetail?.cinema?.cinema_cluster?.cluster_name || ''
            });
            setSelectedCinema({
                id: showtimeDetail?.cinema_id || '',
                name: showtimeDetail?.cinema?.cinema_name || ''
            });
            dispatch(actions.getCinemaClustersByChainId(showtimeDetail?.cinema?.cinema_cluster?.chain_id));
            dispatch(actions.getCinemasByClusterId(showtimeDetail?.cinema?.cluster_id));
        }
    }, [showtimeDetail]);

    const handleSelect = (type, value) => {
        switch (type) {
            case 'chain':
                setSelectedChain({ id: value.chain_id, name: value.chain_name });
                dispatch(actions.getCinemaClustersByChainId(value.chain_id));
                setSelectedCluster({ id: '', name: '' }); // reset cụm
                setSelectedCinema({ id: '', name: '' });
                setPayload(prev => ({ ...prev, chain_id: value.chain_id }));
                break;
            case 'cluster':
                setSelectedCluster({ id: value.cluster_id, name: value.cluster_name });
                dispatch(actions.getCinemasByClusterId(value.cluster_id));
                setSelectedCinema({ id: '', name: '' });
                setPayload(prev => ({ ...prev, cluster_id: value.cluster_id }));
                break;
            case 'cinema':
                setSelectedCinema({ id: value.cinema_id, name: value.cinema_name });
                setPayload(prev => ({ ...prev, cinema_id: value.cinema_id }));
                break;
            case 'movie':
                setSelectedMovie({ id: value.movie_id, title: value.title });
                setPayload(prev => ({ ...prev, movie_id: value.movie_id }));
                break;
            default:
                break;
        }
        setOpenDropdown(null);
    };

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
        setInvalidFields(prev => prev.filter(err => err.name !== field));
    };

    const handleSubmit = async () => {
        setInvalidFields([]);
        const fields = [
            { name: 'price', label: 'giá vé'},
            { name: 'chain_id', label: 'chuỗi rạp',  type: 'select'},
            { name: 'cluster_id', label: 'cụm rạp',  type: 'select'},
            { name: 'cinema_id', label: 'rạp',  type: 'select'},
            { name: 'movie_id', label: 'phim',  type: 'select'},
            { name: 'showtime_date', label: 'ngày chiếu',  type: 'select'},
        ];
        const errors = validateFields(payload, fields);
        if (isNaN(payload.price)||payload.price <= 0 ) {
            errors.push({ name: 'price', message: 'Giá vé phải là số và lớn hơn 0'});
        }
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const { movie_id, chain_id, cluster_id, ...submitPayload } = payload;
        const response = await apiUpdateShowtime(submitPayload, showtimeId);
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách sau khi tạo thành công
            dispatch(actions.getShowtime(selectedCluster.id || '', selectedMovie.id || ''));
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.SHOWTIME_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Cập nhật suất chiếu"/>
            </ContainerBox>
            <ContainerBox>
                <FormRowAd label="Phim">
                    <div className='relative' ref={movieRef}>
                        <SelectBox
                            value={selectedMovie.title}
                            placeholder="Chọn phim"
                            items={moviesData.map((item) => ({
                                label: item.title,
                                onClick: () => handleSelect('movie', item),
                            }))}
                            dropdownKey="movie"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có phim nào"
                            error={invalidFields.find(e => e.name === 'movie_id')?.message}
                            keyPayload="movie_id"
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
                </FormRowAd>
                <FormRowAd label="Chuỗi rạp">
                    <div className='relative' ref={chainRef}>
                        <SelectBox
                            value={selectedChain.name}
                            placeholder="Chọn chuỗi rạp"
                            items={cinemaChains.map((item) => ({
                                label: item.chain_name,
                                onClick: () => handleSelect('chain', item),
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
                            value={selectedCluster.name}
                            placeholder="Chọn chuỗi rạp"
                            items={cinemaClusters.map((item) => ({
                                label: item.cluster_name,
                                onClick: () => handleSelect('cluster',item),
                            }))}
                            dropdownKey="cinemaCluster"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có cụm rạp nào"
                            error={invalidFields.find(e => e.name === 'cluster_id')?.message}
                            keyPayload="cluster_id"
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
                </FormRowAd>
                <FormRowAd label="Rạp">
                    <div className='relative' ref={cinemaRef}>
                        <SelectBox
                            value={selectedCinema.name}
                            placeholder="Chọn rạp"
                            items={cinemas.map((item) => ({
                                label: item.cinema_name,
                                onClick: () => handleSelect('cinema', item),
                            }))}
                            dropdownKey="cinema"
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có chuỗi rạp nào"
                            error={invalidFields.find(e => e.name === 'cinema_id')?.message}
                            keyPayload="cinema_id"
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
                </FormRowAd>
                <FormRowAd label="Ngày chiếu">
                    <FlexibleDatePickerAd 
                        value={payload.showtime_date} 
                        placeholder="dd/MM/yyyy"
                        onChange={(val) => handleChange('showtime_date', val)} 
                        error={invalidFields.find(e => e.name === 'showtime_date')?.message}
                        keyPayload="showtime_date"
                        setInvalidFields={setInvalidFields}
                        enableTimeSelect={true}
                    />
                </FormRowAd>
                <FormRowAd label="Giờ băt đầu chiếu">
                    <FlexibleInputAd 
                        type='time'
                        value={payload.showtime_starttime} 
                        onChange={(val) => handleChange('showtime_starttime', val)} 
                        error={invalidFields.find(e => e.name === 'showtime_starttime')?.message}
                        keyPayload="showtime_starttime"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Giá vé (đ)">
                    <FlexibleInputAd 
                        value={payload.price}
                        placeholder='Nhập giá vé'
                        onChange={(val) => handleChange('price', val)} 
                        error={invalidFields.find(e => e.name === 'price')?.message}
                        keyPayload="price"
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

export default UpdateShowtime;
