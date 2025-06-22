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

const  {RiErrorWarningLine} = icons

const Showtime = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cinemaChains, cinemaClusters } = useSelector(state => state.cinema);
    const { movies, showtimesByDate } = useSelector(state => state.showtime);
    const {isLoggedIn} =useSelector(state=>state.auth)

    const [selectedChainName, setSelectedChainName] = useState(null); //để lưu tên chuỗi rạp chưa có cụm
    const [selectedClusterName, setSelectedClusterName] = useState(null); //để lưu tên cụm rạp chưa có lịch chiếu
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [selectedClusterId, setSelectedClusterId] = useState(null);
    const [selectedChainId, setSelectedChainId] = useState(null);
    const [selectedShowtimeId, setSelectedShowtimeId] = useState(null);
    const [clusterMovies, setClusterMovies] = useState([]);
    const [hasInitialized, setHasInitialized] = useState(false);

    const { checkLoginBefore, modalOpen, setModalOpen, pendingAction} = useRequireLogin();
    // Lấy danh sách button cho modal
    const modalButtons = getModalButtons(setModalOpen, pendingAction);

    useEffect(() => {
        dispatch(actions.getAllCinemaChains());
    }, [dispatch]);

    const handleChainClick = (chainId) => {
        dispatch(actions.resetShowtimes());
        dispatch(actions.getCinemaClustersByChainId(chainId));
        const selectedChain = cinemaChains.find(chain => chain.chain_id === chainId);
        setSelectedChainName(selectedChain ? selectedChain.chain_name : null);

        setSelectedChainId(chainId);
        setSelectedClusterId(null);
        setSelectedMovieId(null);
        setClusterMovies([]);
    };

    const handleClusterClick = async (clusterId) => {
        const selectedCluster = cinemaClusters.find(cluster => cluster.cluster_id === clusterId);
        setSelectedClusterName(selectedCluster ? selectedCluster.cluster_name : null);
        setSelectedClusterId(clusterId);

        // Gọi API lấy suất chiếu của cụm
        const res = await dispatch(actions.getShowtime(clusterId,null));
        // Lấy danh sách phim từ kết quả trả về
        const moviesInCluster  = res?.movies || [];
        setClusterMovies(moviesInCluster);
        if (moviesInCluster.length > 0) {
            const firstMovieId = moviesInCluster[0].movie_id;
            setSelectedMovieId(firstMovieId);

            // Gọi lại action để lấy suất chiếu cho phim đầu tiên
            dispatch(actions.getShowtime(clusterId, firstMovieId));
        } else {
            setSelectedMovieId(null);
        }
    };

    const handleMovieClick = (movieId) => {
        setSelectedMovieId(movieId);
        if (selectedClusterId) {
            dispatch(actions.getShowtime(selectedClusterId, movieId)); // truyền cả movie và cluster
        }
    }

    const handleShowtimeClick = (showtimeId, cinemaId) => {
        checkLoginBefore(
            () => {
                dispatch(actions.getShowtimeDetailById(showtimeId));
                dispatch(actions.getSeatLayout(cinemaId));
                navigate(`/booking/${showtimeId}/select-seat`);
                },
                `/booking/${showtimeId}/select-seat`,   // redirectTo
                { showtimeId },                         // extraState (nếu cần)
                { showModal: true }                     // có thể bỏ – mặc định true
        );
    };

    useEffect(() => {
        if (cinemaChains?.length > 0 && !hasInitialized) {
            handleChainClick(cinemaChains[0].chain_id);
            setHasInitialized(true);
        }
    }, [cinemaChains, hasInitialized]);

    useEffect(() => {
        if (cinemaClusters?.length > 0) {
            handleClusterClick(cinemaClusters[0].cluster_id);
        }
    }, [cinemaClusters]);
    
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
                                    selectedChainId === item.chain_id
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
                                        selectedClusterId === cinema.cluster_id
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
                            <p className="text-gray-400 italic">Hệ thống rạp {selectedChainName} chưa được cập nhật cụm rạp!</p>
                        )}
                    </div>

                    {/* Cột phải: chọn phim và lịch chiếu */}
                    <div className="col-span-2 bg-[#0f172a] text-white rounded-lg p-4 h-fit max-h-[75vh] overflow-y-auto">
                        {clusterMovies.length > 0 ? (
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
                                    <p className="text-gray-400 italic">{selectedClusterName} chưa có lịch chiếu!</p>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-400 italic">{selectedClusterName} chưa có lịch chiếu!</p>
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
