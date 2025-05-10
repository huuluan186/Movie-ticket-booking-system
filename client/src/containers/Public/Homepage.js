import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import {SliderBanner} from '../../components/index'
import slides from '../../utils/sliders'
import {Card} from '../../components/index'
import placehoder from "../../assets/placeholder.png";
import { getImageUrl, formatDate, sortMoviesByReleaseDate } from '../../utils/helpers';
import event1 from '../../assets/event1.jpg'
import event2 from '../../assets/event2.jpg'
import event3 from '../../assets/event3.png'
import event4 from '../../assets/event4.png'


const events = [
  { image: event1, title: 'Event 1' },
  { image: event2, title: 'Event 2' },
  { image: event3, title: 'Event 3' },
  { image: event4, title: 'Event 4' },
];

const Homepage = () => {
    const dispatch = useDispatch();
    const {moviesData} = useSelector(state => state.movie);
    // Gọi API khi component mount
    useEffect( () => {
        dispatch(actions.getMovieList());
    }, [dispatch]);
    
     const latestMovies = sortMoviesByReleaseDate(moviesData, 5);
    
    return (
        <div className="w-full mx-auto border border-red-500">
            <SliderBanner slides={slides} />
            <div className='container mx-auto my-6'>
                <section className="mt-10">
                    <div className="text-orange-600 text-3xl font-bold text-center mb-8 block mx-auto">
                        PHIM MỚI
                        <div className="relative w-[23%] h-0.5 bg-black mt-3 text-center m-auto">
                            <div className="absolute inset-0 w-20 h-1.5 bg-orange-400 m-auto z-10"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                        {latestMovies && latestMovies.length > 0 ? (
                            latestMovies.map((movie) => (
                                <Card
                                    key={movie?.movie_id}
                                    title={movie?.title || "Untitled"}
                                    image={movie?.poster ? getImageUrl(movie?.poster) : placehoder}
                                    releaseDate={formatDate(movie?.release_date)}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Đang tải phim...</p>
                        )}
                    </div>
                </section>
                <section className="my-[50px]">
                    <div className="text-orange-600 text-3xl font-bold text-center mb-8 block mx-auto">
                        EVENT
                        <div className="relative w-[23%] h-0.5 bg-black mt-3 text-center m-auto">
                            <div className="absolute inset-0 w-20 h-1.5 bg-orange-400 m-auto z-10"></div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                        {events.map((event, index) => (
                        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                            <img src={event.image} alt={event.title} className='w-full h-auto object-cover' />
                        </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Homepage
