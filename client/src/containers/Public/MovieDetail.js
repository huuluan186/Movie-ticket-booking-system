import { useDispatch, useSelector } from 'react-redux';
import { Button, MovieInfoItem } from '../../components';
import placehoder from '../../assets/placeholder.png'
import { toSlug } from '../../utils/toSlug';
import { getImageUrl, formatDate } from '../../utils/helpers';
import * as actions from '../../store/actions'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import icons from '../../utils/icon';

const {RiTicket2Line} = icons

const MovieDetail = () => {
    const { title } = useParams();
    const dispatch = useDispatch();
    const { moviesData, movieDetail } = useSelector(state => state.movie);

    const [movieId, setMovieId] = useState(null);

    // Tìm movieId từ slug
    useEffect(() => {
        if (moviesData && Array.isArray(moviesData)) {
        const found = moviesData.find(m => toSlug(m.title) === title);
        if (found) {
            setMovieId(found.movie_id);
        }
        }
    }, [title, moviesData]);

    // Gọi API khi đã có movieId
    useEffect(() => {
        if (movieId) {
        dispatch(actions.getMovieDetail(movieId));
        }
    }, [movieId, dispatch]);

    return (
        <div className='container mx-auto my-6 px-4'>
            {movieDetail ? (
            <>
            <div className='flex gap-[30px]'>
                <div className='flex-[2] h-[330px] overflow-hidden shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.3)]'>
                    <img src={movieDetail?.poster ? getImageUrl(movieDetail?.poster) : placehoder} alt="Movie Poster" className='w-full h-full'/>
                </div>
                <div className='flex-[8] border w-full border-red-500 bg-white'>
                    <h1 className='text-3xl font-semibold uppercase tracking-wider'>{movieDetail?.title}</h1>
                    <hr className='my-4 w-full border-gray-400'/>
                    <MovieInfoItem label="Quốc gia" value={movieDetail?.country} />
                    <MovieInfoItem label="Đạo diễn" value={movieDetail?.director} />
                    <MovieInfoItem label="Diễn viên" value={movieDetail?.cast} />
                    <MovieInfoItem label="Thể loại" value={movieDetail?.genre} />
                    <MovieInfoItem label="Khởi chiếu" value={formatDate(movieDetail?.release_date)} />
                    <MovieInfoItem label="Thời lượng" value={`${movieDetail?.duration} phút`} />
                    <MovieInfoItem label="Giới hạn tuổi" value={movieDetail?.age_limit} />
                    <MovieInfoItem
                        label="Trạng thái"
                        value={movieDetail?.status === 'Now Showing' ? 'Đang chiếu' : 'Sắp chiếu'}
                    />
                    <div className='flex justify-start mt-4 pl-6'>
                        <Button 
                            text={'MUA VÉ'} 
                            textColor='text-white' 
                            bgColor='bg-red-500' 
                            hover='hover:bg-red-600'
                            IcBefore={RiTicket2Line}
                        />
                    </div>
                </div>
            </div>

            <div className='mt-3'>
                <div className="flex justify-center items-center my-4">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold min-w-[300px] flex justify-center space-x-2 cursor-pointer">
                        <span className="text-lg">Nội dung phim</span>
                        <span className="text-lg mx-1">|</span>
                        <span className="text-lg">Trailer</span>
                    </div>
                </div>
                {/* Nội dung mô tả */}
                <div className='bg-white p-4 rounded-b-lg'>
                    <p className='text-gray-800 text-lg'>
                       {movieDetail?.description || "Không có mô tả"}
                    </p>
                </div>
            </div>
            </>
            ): (
                <p>Đang tải thông tin phim...</p>
            )}        
        </div>
    )
}

export default MovieDetail
