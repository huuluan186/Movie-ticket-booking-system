import { useDispatch, useSelector } from 'react-redux';
import { Button, MovieInfoItem } from '../../components';
import placehoder from '../../assets/placeholder.png'
import { getImageUrl, formatDate, getYouTubeEmbedUrl } from '../../utils/helpers';
import * as actions from '../../store/actions'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import icons from '../../utils/icon';

const {RiTicket2Line, FaRegHandPointRight} = icons

const isActive = 'flex items-center space-x-2 font-bold text-xl border-white'
const isNotActive = 'flex items-center space-x-2 text-lg'

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { movieDetail } = useSelector(state => state.movie);
    const [activeTab, setActiveTab] = useState('details');

    // Gọi API khi đã có movieId
    useEffect(() => {
        if (id) {
            dispatch(actions.getMovieDetail(id));
        }
    }, [id, dispatch]);

    return (
        <div className='container mx-auto my-6 px-4'>
            {movieDetail ? (
            <>
            <div className='flex gap-[50px]'>
                <div className='flex-[2] h-[330px] overflow-hidden shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.3)]'>
                    <img src={movieDetail?.poster ? getImageUrl(movieDetail?.poster) : placehoder} alt="Movie Poster" className='w-full h-full'/>
                </div>
                <div className='flex-[8] w-full'>
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

            <div className='mt-3 pb-5'>
                <div className="flex justify-center items-center my-4">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold min-w-[300px] flex justify-center space-x-2 cursor-pointer">
                        <span 
                            onClick={() => setActiveTab('details')}
                            className={`${activeTab==='details' ? isActive : isNotActive}`}            
                        >
                            {activeTab === 'details' && (
                                <FaRegHandPointRight className="text-orange-500 text-lg mr-2" />
                            )}
                            Nội dung phim
                        </span>
                        <span className="text-lg mx-1">|</span>
                        <span 
                            onClick={() => setActiveTab('trailer')}
                            className={`space-x-2 ${activeTab==='trailer' ? isActive : isNotActive}`}                         
                        >
                            {activeTab === 'trailer' && (
                                <FaRegHandPointRight className="text-orange-500 text-lg mr-2" />
                            )}
                            Trailer
                        </span>
                    </div>
                </div>

                <div>
                    {activeTab === 'details' ? (
                    <p className='text-black text-lg px-6'>
                       {movieDetail?.description || "Không có mô tả"}
                    </p> 
                    )   
                    :
                    (
                       <div className='w-[50%] aspect-video mx-auto'>
                        {movieDetail?.linkTrailer ? (
                            <iframe
                                className='w-full h-full'
                                src={getYouTubeEmbedUrl(movieDetail?.linkTrailer)}
                                title="Movie Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe> 
                        ) : (
                            <p className='text-gray-800 text-lg'>Chưa cập nhật trailer</p>
                        )}
                        </div>
                    )}
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
