import { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { toCapitalize } from "../../utils/helpers"
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components/index'
import { getImageUrl, formatDate } from '../../utils/helpers';
import placehoder from '../../assets/placeholder.png'
import { toSlug } from '../../utils/toSlug';

const MoviesByStatus = () => {
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
        'coming-soon': 'Phim sắp chiếu',
        'now-showing': 'Phim đang chiếu',
    };

    const title = movieStatusMap[statusSlug] || 'Danh sách phim';

     useEffect(() => {
        const status = convertSlugToStatus(statusSlug);
        const query = status ? { status } : {};
        dispatch(actions.getMovieList(query));
    }, [dispatch, statusSlug]);

    return (
        <div className="container mx-auto my-6 px-4">
            <div>
                <span className='text-[40px] font-semibold text-gray-800'>
                    {toCapitalize(title)}
                </span>
            </div>
            <hr className='w-full border-gray-800 border-t-2 my-6'/>
            <div className="my-10">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                    {moviesData && moviesData.length > 0 ? (
                        moviesData.map((movie) => (
                            <Card
                                key={movie?.movie_id}
                                title={movie?.title || "Untitled"}
                                image={movie?.poster ? getImageUrl(movie?.poster) : placehoder}
                                releaseDate={formatDate(movie?.release_date)}
                                navigateTo={`/movies/detail/${movie?.movie_id}/${toSlug(movie?.title)}`}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Không có phim nào trong danh sách này.</p>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default MoviesByStatus
