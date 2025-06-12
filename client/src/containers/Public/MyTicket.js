import {useState, useEffect} from 'react'
import icons from '../../utils/icon'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../store/actions'
import { convertRowToLetter, computeShowtimeDateRange, formatDate} from '../../utils/helpers';

const {GrSubtractCircle, CiCirclePlus} = icons

const MyTicket = () => {
    const dispatch = useDispatch();
    const {orderHistory} = useSelector(state => state.order);
    const [openDetails, setOpenDetails] = useState(null);

    const toggleDetails = (id) => {
        setOpenDetails(openDetails === id ? null : id);
    };

    useEffect(() => {
        dispatch(action.getOrderHistory());
    }, [dispatch]);
   
    if (!orderHistory || orderHistory.length === 0) {
        return <div className="text-center">Đang tải hoặc không có lịch sử giao dịch...</div>;
    }

    // Sắp xếp orderHistory theo order_date mới nhất
    const sortedOrderHistory = [...orderHistory].sort((a, b) => 
        new Date(b.order_date) - new Date(a.order_date)
    );

    return (
        <div className='container mx-auto my-6 px-20'>
            <div className='text-center'>
                <h1 className="text-orange-700 text-3xl font-bold text-center mb-6 inline-block mx-auto">
                    LỊCH SỬ GIAO DỊCH 
                    <div className="relative w-full h-0.5 bg-black mt-3">
                        <div className="absolute inset-0 w-20 h-1.5 bg-orange-400 m-auto z-10"></div>
                    </div>
                </h1>
            </div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-3 border-b"></th>
                        <th className="p-3 border-b">MÃ GIAO DỊCH</th>
                        <th className="p-3 border-b">TÊN PHIM</th>
                        <th className="p-3 border-b">NGÀY ĐẶT</th>
                        <th className="p-3 border-b">TỔNG TIỀN (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOrderHistory.map((item) => {
                        const startTime = item?.showtime_starttime;
                        const endTime = item?.showtime_endtime;
                        const showDate = item?.showtime_date;
                        const { startDate, endDate } = computeShowtimeDateRange(showDate, startTime, endTime);
                        
                        return (
                        <>
                            <tr key={item.order_id} className="bg-gray-700 text-white hover:bg-gray-600">
                                <td className="p-3 border-b">                                   
                                    <span 
                                        className='text-3xl cursor-pointer hover:text-orange-600' 
                                        onClick={() => toggleDetails(item.order_id)}
                                    >
                                        {openDetails === item.order_id 
                                            ? <GrSubtractCircle /> 
                                            : <CiCirclePlus />
                                        }
                                    </span>                                   
                                </td>
                                <td className="p-3 border-b">{item.order_id}</td>
                                <td className="p-3 border-b">{item.movie_title}</td>
                                <td className="p-3 border-b">{new Date(item.order_date).toLocaleString()}</td>
                                <td className="p-3 border-b">{Number(item.total_amount).toLocaleString()}</td>
                            </tr>
                            {openDetails === item.order_id && (
                                <tr className="bg-gray-600 text-white">
                                    <td colSpan="5" className="p-4">
                                        <div className="space-y-2 ml-16">
                                            <p><strong>Mã giao dịch:</strong> {item.order_id}</p>
                                            <p><strong>Thời gian giao dịch:</strong> {new Date(item.order_date).toLocaleString()}</p>
                                            <p><strong>Phim:</strong> {item.movie_title}</p>
                                            <p>
                                                <strong>Thời gian chiếu: </strong> 
                                                {formatDate(startDate)} {startTime}
                                            </p>
                                            <p>
                                                <strong>Thời gian kết thúc: </strong> 
                                                {formatDate(endDate)} {endTime}
                                            </p>
                                            <p><strong>Cụm rạp:</strong> {item.chain_name} - {item.cluster_name}</p>
                                            <p><strong>Rạp:</strong> {item.cinema_name}</p>
                                            <p><strong>Địa chỉ:</strong> {item.address}</p>
                                            <p><strong>Ghế:</strong> {item.seats.map(
                                                (seat, index) => (
                                                    <span key={index}>
                                                        {`${convertRowToLetter(seat.row)}${seat.column}`}
                                                        {index < item.seats.length - 1 ? ', ' : ''} 
                                                    </span>
                                                )
                                            )}</p>
                                            <p><strong>Tổng tiền:</strong> {parseFloat(item.total_amount).toLocaleString()}đ </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default MyTicket
