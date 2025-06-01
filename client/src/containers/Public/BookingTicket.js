import { useDispatch, useSelector } from 'react-redux';
import placehoder from '../../assets/placeholder.png'
import { getImageUrl } from '../../utils/helpers';

const BookingTicket = () => {
    const dispatch = useDispatch();
    const {showtimeDetail} = useSelector(state => state.showtime);
    return (
        <div className='container mx-auto w-[70%]'>
            <div className='bg-gray-500'>
                <div className='flex-[2] h-[330px] overflow-hidden shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.3)]'>
                    <img src={showtimeDetail?.movie?.poster ? getImageUrl(showtimeDetail?.movie?.poster) : placehoder} alt="Movie Poster" className='w-full h-full'/>
                </div>
            </div>
        </div>
    )
}

export default BookingTicket
