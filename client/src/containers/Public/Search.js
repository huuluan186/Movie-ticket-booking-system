import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiSearchMovies } from '../../services/movie';
import { toSlug } from '../../utils/toSlug';
import { getImageUrl, formatDate } from '../../utils/helpers';
import placehoder from '../../assets/placeholder.png'
import { path } from '../../utils/constant';
import smallBanner from '../../assets/small-banner.png'
import { Banner, Button, Card} from '../../components';
import icons from '../../utils/icon';

const {RiTicket2Line} = icons

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('s');  // Lấy đúng từ ?s=...
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await apiSearchMovies();
                if (response?.data.err === 0) {
                    const normalizedQuery = toSlug(keyword);
                    const filteredResults = response.data.response.rows.filter((movie) =>
                        toSlug(movie.title || '').includes(normalizedQuery)
                    );
                    setResults(filteredResults);
                } else {
                    setError('Không tìm thấy kết quả');
                }
            } catch (err) {
                setError('Đã có lỗi xảy ra');
            }
            setLoading(false);
        };
        fetchResults();
    }, [keyword]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Banner 
                backgroundImg={smallBanner}
                title={"Tìm kiếm"}
                description={`Theo từ khóa '${keyword}'`}
            />

            <div className="container mx-auto my-6 px-20">
                <div className="my-14">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12'>
                        {results && results.length > 0 ? (
                            results.map((movie) => (
                            <div className='flex flex-col gap-2'>
                                <Card
                                    key={movie?.movie_id}
                                    title={movie?.title || "Untitled"}
                                    image={movie?.poster ? getImageUrl(movie?.poster) : placehoder}
                                    releaseDate={formatDate(movie?.release_date)}
                                    navigateTo={
                                        path.MOVIE_DETAIL
                                            .replace(':id', movie?.movie_id)
                                            .replace(':slug', toSlug(movie?.title))
                                    }
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
                            <p className="text-center text-gray-500">Không có kết quả phù hợp.</p>
                        )}

                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Search
