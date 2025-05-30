import { useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { toCapitalize } from "../../utils/helpers"
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl, formatDate } from '../../utils/helpers';
import placehoder from '../../assets/placeholder.png'
import { toSlug } from '../../utils/toSlug';
import { Banner, Button, Card} from '../../components'
import smallBanner from '../../assets/small-banner.png'
import icons from '../../utils/icon';

const {RiTicket2Line} = icons

const MoviesByStatus = () => {
    const navigate = useNavigate();
    const { statusSlug } = useParams();
    const { moviesData } = useSelector(state => state.movie);
    const dispatch = useDispatch();

    // Chuyển đổi slug (chuỗi URL) về dạng chuẩn của status trong dữ liệu
    const convertSlugToStatus = (slug) => {
        switch (slug) {
            case 'now-showing': return 'Now Showing';
            case 'coming-soon': return 'Coming Soon';
            default: return '';
        }
    };

    const movieStatusMap = {
        'now-showing': {
            title: 'Phim đang chiếu',
            description: 'Danh sách các phim hiện đang chiếu rạp trên toàn quốc!'
        },
        'coming-soon': {
            title: 'Phim sắp chiếu',
            description: 'Danh sách các phim dự kiến sẽ khởi chiếu tại các hệ thống rạp trên toàn quốc.'
        }
    };


    const pageInfo = movieStatusMap[statusSlug] || {
        title: 'Danh sách phim',
        description: ''
    };


     useEffect(() => {
        const status = convertSlugToStatus(statusSlug);
        const query = status ? { status } : {};
        dispatch(actions.getMovieList(query));
    }, [dispatch, statusSlug]);

    return (
        <>
            <Banner 
                backgroundImg={smallBanner}
                title={toCapitalize(pageInfo.title)}
                description={pageInfo.description}
            />
            <div className="container mx-auto my-6 px-4">
                <div className="my-14">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12'>
                        {moviesData && moviesData.length > 0 ? (
                            moviesData.map((movie) => (
                            <div className='flex flex-col gap-2'>
                                <Card
                                    key={movie?.movie_id}
                                    title={movie?.title || "Untitled"}
                                    image={movie?.poster ? getImageUrl(movie?.poster) : placehoder}
                                    releaseDate={formatDate(movie?.release_date)}
                                    navigateTo={`/movies/detail/${movie?.movie_id}/${toSlug(movie?.title)}`}
                                />
                                <Button 
                                    text={'ĐẶT VÉ'} 
                                    textColor='text-white' 
                                    bgColor='bg-red-500' 
                                    hover='hover:bg-red-600'
                                    IcBefore={RiTicket2Line}
                                    onClick={()=>navigate('/showtime')}
                                />
                            </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Không có phim nào trong danh sách này.</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default MoviesByStatus
