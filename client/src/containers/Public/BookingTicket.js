import { useDispatch, useSelector } from 'react-redux';
import placeholder from '../../assets/placeholder.png';
import { getImageUrl, formatDate, computeShowtimeDateRange, roundToUnit } from '../../utils/helpers';
import { getConfirmPaymentButtons } from '../../utils/modalBtnDatas';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import { useParams, useNavigate } from 'react-router-dom';
import { Seat, Button, Modal} from '../../components';
import { toast } from 'react-toastify';
import icons from '../../utils/icon';
import { apiCreateSeatsForCinema } from '../../services/seat';
import { apiGetVipPriceIncrementConfig } from '../../services/getServerConfig'; 

const  {IoCheckmarkCircle, GoQuestion} = icons

const BookingTicket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showtime_id } = useParams();
    const { showtimeDetail } = useSelector(state => state.showtime);
    const { seatLayout } = useSelector(state => state.seat);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [vipPriceIncrement, setVipPriceIncrement] = useState(1);

    // Lấy cấu hình VIP price increment từ API
    useEffect(() => {
        const fetchVipPriceIncrement = async () => {
            try {
                const response = await apiGetVipPriceIncrementConfig();
                // Giả sử response.data chứa giá trị vip_price_increment
                setVipPriceIncrement(response.data.vipPriceIncrement || 1);
            } catch (error) {
                console.error('Error fetching VIP price increment:', error);
                toast.error('Không thể lấy cấu hình giá VIP!');
            }
        };
        fetchVipPriceIncrement();
    }, []);
    
    useEffect(() => {
        if (showtime_id) dispatch(actions.getShowtimeDetailById(showtime_id));
    }, [dispatch, showtime_id]);

    useEffect(() => {
        if (showtimeDetail?.cinema_id && showtimeDetail?.showtime_id) {
            dispatch(actions.getSeatLayout(showtimeDetail.cinema_id, showtimeDetail.showtime_id));
        }
    }, [dispatch, showtimeDetail?.cinema_id, showtimeDetail?.showtime_id]);

    useEffect(() => {
        const fetchSeats = async () => {
            if (showtimeDetail?.cinema_id && showtimeDetail?.showtime_id) {
                try {
                    await apiCreateSeatsForCinema(showtimeDetail.cinema_id); // tạo ghế trước
                    dispatch(actions.getSeatLayout(showtimeDetail.cinema_id, showtimeDetail.showtime_id)); // rồi load layout
                } catch (error) {
                    console.error('Error fetching seats:', error);
                }
            }
        };
        fetchSeats();
    }, [dispatch, showtimeDetail?.cinema_id, showtimeDetail?.showtime_id]);

    
    const startTime = showtimeDetail?.showtime_starttime;
    const endTime = showtimeDetail?.showtime_endtime;
    const showDate = showtimeDetail?.showtime_date;
    const { startDate, endDate } = computeShowtimeDateRange(showDate, startTime, endTime);

    const isSelected = (seatId) => selectedSeats.some(s => s.seatId === seatId);

    const totalPrice = roundToUnit(
        selectedSeats.reduce((total, seat) => {
            return total + (seat.type === 'Normal' 
                ? +showtimeDetail?.price 
                : (showtimeDetail?.price * vipPriceIncrement));
        }, 0),
        1000 // Làm tròn đến hàng nghìn
    );

    const getSeatType = [
        { type: 'Thường', color: 'green-600', bg: 'white' },
        { type: 'VIP', color: 'red-600', bg: 'white' },
        { type: 'Đã Đặt', color: 'white', bg: 'black' },
        { type: 'Đang chọn', color: 'red-800', bg: 'red-800' },
    ]

    const handleSelectSeat = (seat) => {
        if (seat.booked) return;
        // Kiểm tra xem ghế đã được chọn hay chưa
        const isSelected = selectedSeats.some((s) => s.seatId === seat.seatId);
        if (isSelected) setSelectedSeats(prev => prev.filter(s => s.seatId !== seat.seatId));
        else setSelectedSeats(prev => [...prev, seat]);
    };

    const handleCheckoutClick = () => {
        if(selectedSeats.length === 0) toast.error('Vui lòng chọn ghế trước khi thanh toán!');
        else setShowConfirmModal(true);
    }

    const handleConfirmPayment = async () => {
        setShowConfirmModal(false);
        setTimeout(() => {
            setShowSuccessModal(true);        
        }, 1000);
        const payload = {
            showtime_id: showtimeDetail.showtime_id,
            seats: selectedSeats.map(seat => ({
                seatId: seat.seatId,
                type: seat.type,
                booked: true, 
            })),
            total_amount: totalPrice,
        };
        await dispatch(actions.createOrder(payload)); 
    };

    return (
        <>
            <div className="container mx-auto w-[75%] py-6">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-xl py-6 px-10">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-[200px] h-[280px] rounded-md overflow-hidden shadow-md">
                            <img
                                src={
                                    showtimeDetail?.movie?.poster 
                                        ? getImageUrl(showtimeDetail?.movie.poster)  
                                        : placeholder
                                }
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
                <div className="mt-6 bg-gray-600 shadow-xl rounded-lg py-8 px-10">
                    <div className="text-white text-3xl font-bold text-center mb-8 block mx-auto">
                        CHỌN GHẾ
                        <div className="relative w-[23%] h-0.5 bg-white mt-3 text-center m-auto">
                            <div className="absolute inset-0 w-20 h-1.5 bg-orange-400 m-auto z-10"></div>
                        </div>
                    </div>
    
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Seat Grid and Legend */}
                        <div className="lg:w-2/3">
                            <div className="flex flex-col items-center mb-6 relative w-full">
                                <div
                                    className="absolute top-[30px] left-1/2 transform -translate-x-1/2 w-96 h-16 z-0"
                                    style={{
                                        background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 80%)',
                                        filter: 'blur(8px)',
                                    }}
                                />
                                <svg
                                    viewBox="0 0 800 100"
                                    width="100%"
                                    height="70"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="z-10"
                                >
                                    <path
                                        d="M0 80 Q 400 0 800 80"
                                        stroke="#FFD700"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="text-white font-semibold text-lg mt-1 z-10">MÀN HÌNH</div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="grid gap-2 justify-items-center">
                                    {seatLayout.seat_layout?.map((row) => (
                                        <div key={row.row} className="flex justify-items-center gap-8">
                                            <div className="flex flex-wrap justify-center gap-4 w-full max-w-[600px]">
                                                {row.seats.map((seat) => (
                                                    <Seat
                                                        key={seat.seatId}
                                                        seat={seat}
                                                        onSelect={handleSelectSeat}
                                                        isSelected={isSelected(seat.seatId)}
                                                        isBooked={seat.booked}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Legend for seat types */}
                            <div className="flex justify-center gap-6 mt-6 text-white">
                                {getSeatType.map((item) => (
                                    <div key={item.type} className="flex items-center gap-2">
                                        <div className={`w-6 h-6 bg-${item.bg} border-2 border-${item.color}`}/>
                                        <span>{item.type}</span>
                                </div>
                                ))}
                            </div>
                        </div>
    
                        {/* Selected Seats and Total */}
                        <div className='lg:w-1/3 text-white pt-10'>
                            <div className="flex flex-col justify-between min-h-[500px] p-4 bg-gray-800 rounded-lg">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-xl text-center mb-4">Ghế đã chọn</h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">Mã ghế</span>
                                        <span className="font-semibold">Giá (đồng)</span>
                                    </div>
        
                                {selectedSeats.length > 0 ? (
                                    selectedSeats.map((seat) => (
                                    <div className="flex justify-between items-center border-t border-gray-600 pt-2" key={seat.seatId}>
                                        <Seat
                                            key={seat.seatId}
                                            seat={seat}
                                            isBooked={false}
                                            disableHover={true}
                                            onSelect={() => {}}
                                        />
                                        <span>
                                            {
                                            seat.type === 'Normal' ? (+showtimeDetail.price).toLocaleString() 
                                                : roundToUnit(showtimeDetail.price * vipPriceIncrement, 1000).toLocaleString()
                                            }
                                        </span>
                                    </div>
                                    ))
                                ) : (
                                    <div className="flex justify-center"><span>Chưa chọn ghế</span></div>
                                )}
                                    {/* Total row */}
                                    <div className="flex justify-between items-center mt-5 py-6 text-lg">
                                        <h3>Tổng số ghế: <p className='font-semibold'>{selectedSeats.length}</p></h3>
                                        <h3>Tổng tiền: <p className='font-semibold text-orange-600'>{totalPrice.toLocaleString()}đ</p></h3>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 w-full'>
                                <Button
                                    text="Thanh toán"
                                    fullWidth={true}
                                    textColor="text-white"
                                    bgColor="bg-green-600"
                                    hover="hover:bg-green-700"
                                    onClick={handleCheckoutClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showConfirmModal}
                title="Xác nhận"
                message="Bạn có đồng ý tiến hành thanh toán?"
                icon={GoQuestion}
                buttons={getConfirmPaymentButtons(setShowConfirmModal, handleConfirmPayment)}
            />
            <Modal
                isOpen={showSuccessModal}
                title="Thông báo"
                message="Đặt vé thành công"
                icon={IoCheckmarkCircle}
                buttons={
                    [
                        {
                            text: 'OK',
                            textColor: 'text-white',
                            bgColor: 'bg-orange-600',
                            hover: 'hover:bg-orange-700',
                            onClick: () => {
                                setShowSuccessModal(false);
                                navigate('/user/orders');
                                dispatch(actions.getOrderHistory());
                            },
                        },
                    ]
                }
            />
        </>
    );
};

export default BookingTicket;