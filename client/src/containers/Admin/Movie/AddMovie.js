import {SelectBox, TitleHeader, ContainerBox, FlexibleInputAd, FlexibleDatePickerAd ,FormRowAd, Button} from '../../../components';
import { useEffect, useState } from 'react';
import { useClickMouseOutside } from '../../../hooks';
import { useRef } from 'react';
import { validateFields } from '../../../utils/validation';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import {path} from '../../../utils/constant'
import { apiCreateMovie, apiGetMovieStatuses } from '../../../services/movie';

const AddMovie = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        title: '',
        country: '',
        genre: '',
        duration: '',
        release_date: '',
        age_limit: '',
        director: '',
        cast: '',
        description: '',
        linkTrailer: '',
        poster: '',
        status: { engVal: '', vnVal: '' },
    });

    const [statuses, setStatuses] = useState([]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    
    const statusRef = useRef(null);
    // Sử dụng useClickMouseOutside để đóng dropdown khi click ra ngoài
    useClickMouseOutside([statusRef], () =>  setOpenDropdown(null));

    useEffect(()=>{
        const fetchStatuses = async ()=>{
            const response = await apiGetMovieStatuses()
            if(response?.data?.err===0){
                setStatuses(response.data.response || []);
            }
        }
        fetchStatuses()
    },[])

    const handleChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            [field]: value
        }));
        setInvalidFields(prev => prev.filter(err => err.name !== field));
    };

    const handleSelectStatus = (s) => {
        setPayload(prev => ({
            ...prev,
            status: {
                engVal: s.englishValue,
                vnVal: `Phim ${s.vietnameseValue}`
            }
        }));
        setOpenDropdown(null);
    };

    const handleSubmit = async () => {
        setInvalidFields([]);
        const fields = [
            { name: 'title', label: 'tên phim'},
            { name: 'country', label: 'tên quốc gia'},
            { name: 'genre', label: 'thể loại'},
            { name: 'duration', label: 'thời lượng phim'},
            { name: 'status', label: 'trạng thái phim',  type: 'select', keyCheck: 'engVal' },
            { name: 'release_date', label: 'ngày công chiếu',  type: 'select'}
        ];
        const errors = validateFields(payload, fields);
        if (isNaN(payload.duration)) {
            errors.push({ name: 'duration', message: 'Thời lượng phải là số nguyên dương'});
        }
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const finalPayload = {
            ...payload,
            status: payload.status.engVal || 'user'
        };
        const response = await apiCreateMovie(finalPayload);
        if (response?.err === 0) {
            toast.success(response.msg);
            //Fetch lại danh sách sau khi tạo thành công
            dispatch(actions.getMovieList());
            setTimeout(() => {
                navigate(`${path.ADMIN}/${path.MOVIE_MANAGER}`);
            }, 500);
        } else toast.warning(response?.msg || 'Đã có lỗi xảy ra');
    }

    return (
        <div className='space-y-4'>
            <ContainerBox>
                <TitleHeader title="Thêm phim"/>
            </ContainerBox>
            <ContainerBox>
                <FormRowAd label="Tên phim">
                    <FlexibleInputAd 
                        value={payload.title} 
                        onChange={(val) => handleChange('title', val)} 
                        error={invalidFields.find(e => e.name === 'title')?.message}
                        keyPayload="title"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Quốc gia">
                    <FlexibleInputAd 
                        value={payload.country} 
                        onChange={(val) => handleChange('country', val)} 
                        error={invalidFields.find(e => e.name === 'country')?.message}
                        keyPayload="country"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Thể loại">
                    <FlexibleInputAd 
                        value={payload.genre} 
                        onChange={(val) => handleChange('genre', val)} 
                        error={invalidFields.find(e => e.name === 'genre')?.message}
                        keyPayload="genre"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Thời lượng (phút)">
                    <FlexibleInputAd 
                        value={payload.duration} 
                        onChange={(val) => handleChange('duration', val)} 
                        error={invalidFields.find(e => e.name === 'duration')?.message}
                        keyPayload="duration"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Ngày phát hành">
                    <FlexibleDatePickerAd 
                        value={payload.release_date} 
                        onChange={(val) => handleChange('release_date', val)} 
                        error={invalidFields.find(e => e.name === 'release_date')?.message}
                        keyPayload="release_date"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Đạo diễn">
                    <FlexibleInputAd 
                        value={payload.director} 
                        onChange={(val) => handleChange('director', val)} 
                        error={invalidFields.find(e => e.name === 'director')?.message}
                        keyPayload="director"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                 <FormRowAd label="Diễn viên">
                    <FlexibleInputAd 
                        value={payload.cast} 
                        onChange={(val) => handleChange('cast', val)} 
                        error={invalidFields.find(e => e.name === 'cast')?.message}
                        keyPayload="cast"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Giới hạn tuổi">
                    <FlexibleInputAd 
                        value={payload.age_limit} 
                        onChange={(val) => handleChange('age_limit', val)} 
                        error={invalidFields.find(e => e.name === 'age_limit')?.message}
                        keyPayload="age_limit"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Mô tả nội dung">
                    <FlexibleInputAd 
                        type='textarea'
                        value={payload.description} 
                        onChange={(val) => handleChange('description', val)} 
                        error={invalidFields.find(e => e.name === 'description')?.message}
                        keyPayload="description"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Trạng thái">
                    <div className='relative' ref={statusRef}>
                        <SelectBox
                            value={payload.status.vnVal}
                            placeholder="Chọn trạng thái"
                            items={statuses.map((s) => ({
                                label: `Phim ${s.vietnameseValue}`,
                                onClick: () => handleSelectStatus(s),
                            }))}
                            dropdownKey="status"
                            error={invalidFields.find(e => e.name === 'status')?.message}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            emptyMessage="Không có trạng thái nào"
                            keyPayload="status"
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
                </FormRowAd>
                <FormRowAd label="Link trailer">
                    <FlexibleInputAd 
                        value={payload.linkTrailer} 
                        onChange={(val) => handleChange('linkTrailer', val)} 
                        error={invalidFields.find(e => e.name === 'linkTrailer')?.message}
                        keyPayload="linkTrailer"
                        setInvalidFields={setInvalidFields}
                    />
                </FormRowAd>
                <FormRowAd label="Poster">
                    <FlexibleInputAd 
                        type='file'
                        value={payload.poster} 
                        onChange={(val) => handleChange('poster', val)} 
                        error={invalidFields.find(e => e.name === 'poster')?.message}
                        keyPayload="poster"
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

export default AddMovie;
