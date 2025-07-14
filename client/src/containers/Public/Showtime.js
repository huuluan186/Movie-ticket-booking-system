import { useEffect, useState } from 'react';
import smallBanner from '../../assets/small-banner.png';
import { Banner, Modal} from '../../components';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, getImageUrl  } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import icons from '../../utils/icon';
import {getModalButtons} from '../../utils/modalBtnDatas';
import { useRequireLogin } from '../../hooks';
import { apiCreateSeatsForCinema } from '../../services/seat';
import { path } from '../../utils/constant';

const  {RiErrorWarningLine} = icons

const Showtime = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cinemaChains, cinemaClusters } = useSelector(state => state.cinema);
    const { showtimesByDate } = useSelector(state => state.showtime);

    // State lưu chuỗi và cụm rạp đã chọn, gồm id (để gọi API) và name 
    const [selectedChain, setSelectedChain] = useState({ id: null, name: null });
    const [selectedCluster, setSelectedCluster] = useState({ id: null, name: null });
    // ID phim được chọn trong cụm rạp (dùng để lọc lịch chiếu theo phim)
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    // Danh sách phim có suất chiếu trong cụm rạp đã chọn
    const [clusterMovies, setClusterMovies] = useState([]);
    // Biến cờ để đảm bảo chỉ chạy khởi tạo chain lần đầu khi component mount
    const [hasInitialized, setHasInitialized] = useState(false);

    // Custom hook kiểm tra login, điều khiển modal
    const { checkLoginBefore, modalOpen, setModalOpen, pendingAction} = useRequireLogin();
    const modalButtons = getModalButtons(setModalOpen, pendingAction);

    useEffect(() => {
        dispatch(actions.getAllCinemaChains());
    }, [dispatch]);

    const handleChainClick = (chainId) => {
        dispatch(actions.resetShowtimes()); // Reset dữ liệu suất chiếu
        dispatch(actions.getCinemaClustersByChainId(chainId));
        // Tìm tên chuỗi rạp để lưu hiển thị sau nếu không có cụm
        const selected = cinemaChains.find(c => c.chain_id === chainId);
        setSelectedChain({ id: chainId, name: selected?.chain_name || null });
        // Reset cụm, phim, lịch chiếu nếu đổi chuỗi rạp
        setSelectedCluster({ id: null, name: null });
        setSelectedMovieId(null);
        setClusterMovies([]);
    };

    const handleClusterClick = async (clusterId) => {
        const selected = cinemaClusters.find(c => c.cluster_id === clusterId);
        setSelectedCluster({ id: clusterId, name: selected?.cluster_name || null });

        // Gọi API lấy suất chiếu của cụm
        const res = await dispatch(actions.getShowtime(clusterId,null));
        // Lấy danh sách phim từ kết quả trả về
        const moviesInCluster  = res?.movies || [];
        setClusterMovies(moviesInCluster);
        if (moviesInCluster.length > 0) {// Nếu cụm có phim, chọn phim đầu tiên mặc định và gọi lịch chiếu theo phim
            const firstMovieId = moviesInCluster[0].movie_id;
            setSelectedMovieId(firstMovieId);
            // Gọi lại action để lấy suất chiếu cho phim đầu tiên
            dispatch(actions.getShowtime(clusterId, firstMovieId));
        } else setSelectedMovieId(null);
    };

    const handleMovieClick = (movieId) => {
        setSelectedMovieId(movieId);
        if (selectedCluster.id) dispatch(actions.getShowtime(selectedCluster.id, movieId)); // truyền cả movie và cluster
    }

    const handleShowtimeClick = (showtimeId, cinemaId) => {
        checkLoginBefore(
            async () => {
                    dispatch(actions.getShowtimeDetailById(showtimeId));
                    await apiCreateSeatsForCinema(cinemaId);
                    dispatch(actions.getSeatLayout(cinemaId, showtimeId));
                    navigate(path.BOOKING_TICKET.replace(':showtime_id', showtimeId));
                },
                path.BOOKING_TICKET.replace(':showtime_id', showtimeId),   // redirectTo
                { showtimeId },                         // extraState (nếu cần)
                { showModal: true }                     // có thể bỏ – mặc định true
        );
    };

    // Khởi tạo chọn chuỗi rạp đầu tiên khi trang vừa tải
    useEffect(() => {
        if (cinemaChains?.length > 0 && !hasInitialized) {
            handleChainClick(cinemaChains[0].chain_id);
            setHasInitialized(true);
        }
    }, [cinemaChains, hasInitialized]);

    // Tự động chọn cụm đầu tiên nếu có cụm hợp lệ khi đã chọn chuỗi
    useEffect(() => {
        if (cinemaClusters?.length > 0 && selectedChain.id) {
            // Kiểm tra xem cinemaClusters có thuộc chuỗi rạp được chọn không
            const hasValidClusters = cinemaClusters.some(cluster => 
                cluster.cinema_chain.chain_id === selectedChain.id
            );
            if (hasValidClusters) handleClusterClick(cinemaClusters[0].cluster_id);
            else {
                setSelectedCluster({ id: null, name: null });
                setSelectedMovieId(null);
                setClusterMovies([]);
                dispatch(actions.resetShowtimes()); // Reset nếu không có cụm hợp lệ
            }
        } else if (cinemaClusters?.length === 0 && selectedChain.id) {
            setSelectedCluster({ id: null, name: null });
            setSelectedMovieId(null);
            setClusterMovies([]);
            dispatch(actions.resetShowtimes()); // Reset khi không có cụm
        }
    }, [cinemaClusters, selectedChain.id]);
    
    return (
        <>
            <Banner
                backgroundImg={smallBanner}
                title={'Lịch chiếu'}
                description={'Tìm lịch chiếu phim / rạp nhanh nhất với chỉ 1 bước!'}
            />

            <div className="container mx-auto py-6 w-[70%]">
                <div className="flex justify-center gap-7 mb-6">
                    {cinemaChains?.length > 0 &&
                        cinemaChains.map((item) => (
                            <img
                                key={item.chain_id}
                                src={getImageUrl(item.logo)}
                                alt={item.chain_name}
                                className={`w-16 h-16 rounded-full object-contain transition-all cursor-pointer border-[2px] ${
                                    selectedChain.id === item.chain_id
                                        ? 'border-orange-600 scale-110'
                                        : 'border-gray-400 hover:border-orange-400 hover:scale-110'
                                }`}
                                onClick={() => handleChainClick(item.chain_id)}
                            />
                        ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Cột trái: cụm rạp */}
                    <div className="bg-[#0f172a] text-white rounded-lg p-4 h-fit max-h-[75vh] overflow-y-auto">
                        {cinemaClusters?.length > 0 ? (
                            cinemaClusters.map((cinema) => (
                                <div
                                    key={cinema.cluster_id}
                                    className={`mb-4 border-b border-gray-600 pb-2 cursor-pointer transition-all rounded-md p-2 ${
                                        selectedCluster.id === cinema.cluster_id
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700'
                                    }`}
                                    onClick={() => handleClusterClick(cinema.cluster_id)}
                                >
                                    <p className="font-semibold">
                                        <span className="text-orange-600">{cinema.cinema_chain.chain_name}</span> - {cinema.cluster_name}
                                    </p>
                                    <p className="text-sm text-gray-400">{cinema.address}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">Hệ thống rạp {selectedChain.name} chưa được cập nhật cụm rạp!</p>
                        )}
                    </div>

                    {/* Cột phải: chọn phim và lịch chiếu */}
                    <div className="col-span-2 bg-[#0f172a] text-white rounded-lg p-4 h-fit max-h-[75vh] overflow-y-auto">
                        {clusterMovies.length > 0 || (cinemaClusters?.length > 0 && showtimesByDate.length === 0) ? (
                            <>
                                {/* Danh sách phim trong cụm rạp */}
                                <div className='mb-10'>
                                    <div className="flex justify-center flex-wrap gap-10 mb-4 pb-2 border-b border-gray-600">
                                        {clusterMovies.map((item) => (
                                            <div
                                                key={item.movie_id}
                                                className={`flex flex-col items-center w-24 cursor-pointer transition-all rounded-md p-2 ${
                                                    selectedMovieId === item.movie_id
                                                        ? 'bg-orange-600 text-white'
                                                        : 'hover:bg-gray-700'
                                                }`}
                                                onClick={() => {
                                                    handleMovieClick(item.movie_id)
                                                }}
                                            >
                                                <div className="w-20 h-20 rounded overflow-hidden bg-gray-800">
                                                    <img
                                                        src={getImageUrl(item.poster)}
                                                        alt={item.title}
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                                <div className="w-full text-sm mt-1 text-center text-white line-clamp-3" title={item.title}>
                                                    {item.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Lịch chiếu */}
                                {showtimesByDate.length > 0 ? (
                                    showtimesByDate.map(({ date, showtimes }) => (
                                        <div key={date} className="mb-6 pb-4 border-b border-gray-600">
                                            <h4 className="text-md font-bold text-gray-300 mb-2">{formatDate(date)}</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {showtimes.map(st => (
                                                    <button
                                                        key={st.showtime_id}
                                                        onClick={()=>handleShowtimeClick(st.showtime_id, st.cinema_id)}
                                                        className="px-3 py-2 bg-white text-black border border-gray-300 rounded hover:bg-orange-400 hover:text-white"
                                                    >
                                                        {st.start_time.slice(0, 5)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 italic">{selectedCluster.name} chưa có lịch chiếu!</p>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-400 italic">Hệ thống rạp {selectedChain.name} chưa có cụm hoặc lịch chiếu!</p>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                title="Yêu cầu đăng nhập"
                message="Vui lòng đăng nhập để tiếp tục đặt vé!"
                icon={RiErrorWarningLine}
                buttons={modalButtons}
            />
        </>
    );
};

export default Showtime;