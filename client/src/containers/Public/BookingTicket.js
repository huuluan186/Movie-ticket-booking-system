import { useDispatch, useSelector } from 'react-redux';
import placeholder from '../../assets/placeholder.png';
import { getImageUrl, formatDate, computeShowtimeDateRange } from '../../utils/helpers';
import { useEffect } from 'react';
import * as actions from '../../store/actions';
import { useParams } from 'react-router-dom';

const convertRowToLetter = (rowNumber) => {
    return String.fromCharCode(64 + rowNumber); // 1 -> A, 2 -> B, etc.
};

const BookingTicket = () => {
    const dispatch = useDispatch();
    const { showtime_id } = useParams();
    const { showtimeDetail } = useSelector(state => state.showtime);
    const { seatLayout } = useSelector(state => state.seat);

    useEffect(() => {
        dispatch(actions.getShowtimeDetailById(showtime_id));
    }, [dispatch]);

    const startTime = showtimeDetail?.showtime_starttime;
    const endTime = showtimeDetail?.showtime_endtime;
    const showDate = showtimeDetail?.showtime_date;
    const { startDate, endDate } = computeShowtimeDateRange(showDate, startTime, endTime);

    return (
        <div className="container mx-auto w-[70%] py-6">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-xl py-6 px-10">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-[180px] h-[260px] rounded-md overflow-hidden shadow-md">
                        <img
                            src={showtimeDetail?.movie?.poster ? getImageUrl(showtimeDetail?.movie.poster) : placeholder}
                            alt="Movie Poster"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="text-white flex flex-col justify-center gap-3">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight mb-1">
                                {showtimeDetail?.movie?.title || 'Tên phim'}
                            </h2>
                        </div>
                        <div className="text-base">
                            <span className="font-semibold text-gray-300">Cụm rạp: </span>
                            <span>
                                {showtimeDetail?.cinema?.cinema_cluster?.cinema_chain?.chain_name || ''} -{' '}
                                {showtimeDetail?.cinema?.cinema_cluster?.cluster_name || ''}
                            </span>
                        </div>
                        <div className="text-base">
                            <span className="font-semibold text-gray-300">Suất chiếu: </span>
                            <span>
                                {formatDate(startDate) || ''} {startTime?.slice(0, 5) || ''} ~{' '}
                                {formatDate(endDate) || ''} {endTime?.slice(0, 5) || ''}
                            </span>
                        </div>
                        <div className="text-base">
                            <span className="font-semibold text-gray-300">Rạp: </span>
                            <span>{showtimeDetail?.cinema?.cinema_name || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 bg-gray-700 rounded-lg shadow-xl py-6 px-10">
                <h2 className="text-white text-2xl font-bold text-center mb-4">CHỌN GHẾ</h2>
                <div className="flex justify-center mb-6">
                    <div className="relative w-[80%] max-w-[600px] flex flex-col items-center">
                        <div
                            className="w-full h-4 rounded-t-full"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(255, 204, 0, 0.6), transparent)',
                                boxShadow: '0 0 15px 5px rgba(255, 204, 0, 0.3), 0 0 10px 3px rgba(255, 255, 255, 0.2)',
                                border: '1px solid rgba(255, 204, 0, 0.6)',
                                borderBottom: 'none',
                                borderRadius: '150% 150% 0 0 / 200% 200% 0 0', // Flatter, wider curve
                            }}
                        ></div>
                        <div className="text-yellow-400 font-semibold text-lg mt-2">MÀN HÌNH</div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="grid gap-2">
                        {seatLayout.seat_layout?.map((row) => (
                            <div key={row.row} className="flex items-center gap-8">
                                {/* Seats in the row */}
                                <div className="grid grid-cols-8 gap-4">
                                    {row.seats.map((seat) => (
                                        <button
                                            key={seat.seatId}
                                            className={`w-10 h-10 rounded-md flex items-center justify-center text-black text-sm border-2 bg-white
                                                ${seat.booked ? 'border-gray-500 cursor-not-allowed' : seat.type === 'VIP' ? 'border-red-600' : 'border-green-600'}
                                                hover:bg-opacity-80 transition-colors duration-200`}
                                            disabled={seat.booked}
                                        >
                                            {`${convertRowToLetter(seat.row)}${seat.column}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Legend for seat types */}
                <div className="flex justify-center gap-6 mt-4 text-white">
                    <div className="flex items-center gap-2 ">
                        <div className="w-6 h-6 bg-white border-2 border-green-600"></div>
                        <span>Thường</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white border-2 border-red-600"></div>
                        <span>VIP</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white border-2 border-gray-600"></div>
                        <span>Đã Đặt</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-800"></div>
                        <span>Checked</span>
                    </div>
                </div>
                {/* Uncomment and update this section if you want to display selected seats and total price */}
                {/* <div className="mt-6 text-white flex justify-between">
                    <div>
                        <h3>Ghế đã chọn:</h3>
                        <ul>
                            {selectedSeats.map((seat) => (
                                <li key={seat.seatId}>
                                    {`Ghế ${getRowLetter(seat.row)}${seat.column} (${seat.type}) - ${seat.type === 'VIP' ? '100000đ' : '50000đ'}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Tổng số ghế: {selectedSeats.length}</h3>
                        <h3>Tổng tiền: {totalPrice}đ</h3>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default BookingTicket;