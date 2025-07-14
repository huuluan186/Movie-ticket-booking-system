import { ManagementTable, TitleHeader, ContainerBox, DetailModal, Modal, Button, SelectBox } from '../../../components';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { formatDateTime, getImageUrl, formatDate, computeShowtimeDateRange } from '../../../utils/helpers';
import { path } from '../../../utils/constant';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import icons from '../../../utils/icon';
import { apiGetShowtimeDetailById, apiDeleteShowtime } from '../../../services/showtime';
import { useClickMouseOutside } from '../../../hooks';

const { IoCheckmarkCircle, GoQuestion, FaRegFrownOpen } = icons;

const ShowtimeManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isNestedPage = location.pathname !== `${path.ADMIN}/${path.SHOWTIME_MANAGER}`;
    const { cinemaChains, cinemaClusters } = useSelector(state => state.cinema);
    const { moviesData } = useSelector(state => state.movie);
    const { showtimesByDate, movies, msg, err } = useSelector(state => state.showtime);
    const [selectedChain, setSelectedChain] = useState({ id: '', name: '' });
    const [selectedCluster, setSelectedCluster] = useState({ id: '', name: '' });
    const [selectedMovie, setSelectedMovie] = useState({ id: '', title: '' });
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState({});
    const [isFiltering, setIsFiltering] = useState(false); //quản lý state có phải bấm nút Lọc không
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, showtime_id: null, movie_title: null });
    const [resultModal, setResultModal] = useState({ isOpen: false, msg: '', success: false });

    const chainRef = useRef();
    const clusterRef = useRef();
    const movieRef = useRef();
    useClickMouseOutside([chainRef, clusterRef, movieRef], () =>  setOpenDropdown(null));

    useEffect(() => {
        fetchShowtimes('', ''); // Lấy dữ liệu mặc định khi vào trang
        dispatch(actions.getAllCinemaChains());
        dispatch(actions.getMovieList());
    }, [dispatch]);

    useEffect(() => {
        if (isFiltering && msg !== null) {
            // Đảm bảo msg có thay đổi mới hiển thị
            toast[err === 0 ? 'success' : 'error'](msg, { autoClose: 1200 });
            setIsFiltering(false);
        }
    }, [showtimesByDate]);

    const fetchShowtimes = (clusterId, movieId) => {
        dispatch(actions.getShowtime(clusterId || '', movieId || ''));
    };

    const columns = ['Mã phim', 'Tên phim', 'Số xuất chiếu', 'Thời lượng', 'Trạng thái', 'Poster'];
    const columnsDetail = ['Mã suất chiếu','Tên phim','Cụm rạp','Rạp','Thời gian bắt đầu','Thời gian kết thúc','Giá vé','Thời gian tạo','Cập nhật lần cuối'];
    const getVietnameseStatus = (status) => {
        if (status === 'Coming Soon') return 'Sắp chiếu';
        if (status === 'Now Showing') return 'Đang chiếu';
        return 'Chưa rõ';
    };
    // Hàm định dạng dữ liệu để hiển thị trên bảng
    const formattedData = showtimesByDate.length > 0 ? 
        // Nhóm showtime theo movie_id
        Object.values(showtimesByDate.reduce((acc, date) => { // Gom nhóm suất chiếu theo movie_id
            date.showtimes.forEach(showtime => {
                if (!acc[showtime.movie_id]) acc[showtime.movie_id] = [];
                acc[showtime.movie_id].push(showtime);
            });
            return acc;
        }, {})).map(showtimesGroup => {
            // Tìm thông tin phim tương ứng
            const movie = movies.find(m => m.movie_id === showtimesGroup[0].movie_id) || {};
            // Nếu có điều kiện lọc, chỉ giữ showtime của phim được chọn
            const filteredShowtimes = showtimesGroup 
            if (filteredShowtimes.length === 0) return null;
            return [
                movie.movie_id,
                movie.title || '',
                filteredShowtimes.length,
                movie.duration || '',
                movie.status ? getVietnameseStatus(movie.status) : '',
                getImageUrl(movie.poster) || '*Chưa có poster',
            ];
    }).filter(row => row !== null) : [];

    const handleSelect = (type, value) => {
        switch (type) {
            case 'chain':
                setSelectedChain({ id: value.chain_id, name: value.chain_name });
                dispatch(actions.getCinemaClustersByChainId(value.chain_id));
                setSelectedCluster({ id: '', name: '' }); // reset cụm
                break;
            case 'cluster':
                setSelectedCluster({ id: value.cluster_id, name: value.cluster_name });
                break;
            case 'movie':
                setSelectedMovie({ id: value.movie_id, title: value.title });
                break;
            default:
                break;
        }
        setOpenDropdown(null);
    };

    const handleView = async (row) => {
        const movieId = row?.[0];
        const filteredDates = movieId
            ? showtimesByDate.map(date => ({ // Lọc ngày theo movie_id nếu có
                ...date,
                showtimes: date.showtimes.filter(st => st.movie_id === movieId)
            }))
            : showtimesByDate;

        const detailArrays = await Promise.all( // Lấy chi tiết suất chiếu từ API
            filteredDates.map(date =>
                Promise.all(
                    date.showtimes.map(async showtime => {
                        const detailResp = await apiGetShowtimeDetailById(showtime.showtime_id);
                        const detail = detailResp?.data?.response;
                        if (detail) {
                            return {
                                'Mã suất chiếu': showtime.showtime_id,
                                'Tên phim': detail.movie?.title || '',
                                'Cụm rạp': `${detail.cinema?.cinema_cluster?.cinema_chain?.chain_name || ''} - ${detail.cinema?.cinema_cluster?.cluster_name || ''}`,
                                'Rạp': detail.cinema?.cinema_name || '',
                                'Thời gian bắt đầu': formatDate(computeShowtimeDateRange(date.date, showtime.start_time, showtime.end_time).startDate) + ' ' + showtime.start_time.slice(0, 5),
                                'Thời gian kết thúc': formatDate(computeShowtimeDateRange(date.date, showtime.start_time, showtime.end_time).endDate) + ' ' + showtime.end_time.slice(0, 5),
                                'Giá vé': `${parseFloat(showtime.price).toLocaleString()} VNĐ`,
                                'Thời gian tạo': formatDateTime(detail.createdAt),
                                'Cập nhật lần cuối': formatDateTime(detail.updatedAt),
                            };
                        }
                        return null;
                    })
                )
            )
        );
        const details = detailArrays.flat().filter(Boolean); // Lọc bỏ các giá trị null
        const formattedDetails = details.map(d => [
            d['Mã suất chiếu'],
            d['Tên phim'],
            d['Cụm rạp'],
            d['Rạp'],
            d['Thời gian bắt đầu'],
            d['Thời gian kết thúc'],
            d['Giá vé'],
            d['Thời gian tạo'],
            d['Cập nhật lần cuối'],
        ]);
        setSelectedShowtime(formattedDetails);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        const showtimeId = row[0];
        setIsModalOpen(false);
        navigate(`${path.ADMIN}/${path.SHOWTIME_MANAGER}/${path.UPDATE.replace(':id', showtimeId)}`);
    };

    const handleDelete = (row) => {
        setConfirmModal({
            isOpen: true,
            showtime_id: row[0],
            movie_title: row[1],
        });
    };

    const confirmDelete = async () => {
        try {
            const response = await apiDeleteShowtime(confirmModal.showtime_id);
            setConfirmModal({ isOpen: false, showtime_id: null });
            setResultModal({ isOpen: true, msg: response?.msg || 'Xóa thành công!', success: response?.err === 0 });
            if(response?.err===1) return;
            // cập nhật lại cả danh sách showtime và chi tiết
            fetchShowtimes(selectedCluster.id, selectedMovie.id);
            // cập nhật selectedShowtime sau khi xóa
            setSelectedShowtime(prev =>
                prev.filter(row => row[0] !== confirmModal.showtime_id)
            );
        } catch (error) {
            const errMsg = error?.response?.msg || 'Đã xảy ra lỗi khi xóa';
            setConfirmModal({ isOpen: false, showtimeId: null });
            setResultModal({ isOpen: true, msg: errMsg, success: false });
        }
    };

    const handleCloseResultModal = () => {
        setResultModal({ isOpen: false, msg: '', success: false });
        fetchShowtimes(selectedCluster.id, selectedMovie.id);
    };

    const handleFilter = () => {
        setIsFiltering(true);
        fetchShowtimes(selectedCluster.id, selectedMovie.id);
    };

    // Hàm tạo danh sách mục cho dropdown
    const createItems = (type, data, resetText, labelField = 'name', idField = 'id') => {
        if (!data?.length) return [];
        return [
            {
                label: resetText, // Thêm mục "Reset" để xóa lựa chọn
                onClick: () => {
                    if (type === 'chain') {
                        setSelectedChain({ id: '', name: '' });
                        setSelectedCluster({ id: '', name: '' }); // reset cụm luôn
                    }
                    if (type === 'cluster') setSelectedCluster({ id: '', name: '' });
                    if (type === 'movie') setSelectedMovie({ id: '', title: '' });
                }
            },
            ...data.map(item => ({ // Tạo danh sách các mục từ dữ liệu
                label: item[labelField], // Giá trị hiển thị
                onClick: () => handleSelect(type, item)
            }))
        ];
    };

    return (
        <>
            {isNestedPage ? (
                <Outlet />
            ) : (
                <div className='space-y-4'>
                    <ContainerBox>
                        <TitleHeader title="Quản lý suất chiếu" />
                    </ContainerBox>
                    <ContainerBox>
                        <div className="grid grid-cols-12 gap-4 mb-4">
                            <div className="col-span-3 text-left relative" ref={chainRef}>
                                <SelectBox
                                    label="Chuỗi rạp"
                                    value={selectedChain.name}
                                    placeholder="Chọn chuỗi rạp"
                                    items={createItems('chain', cinemaChains, "Chọn chuỗi rạp", 'chain_name', 'chain_id')}
                                    dropdownKey="chain"
                                    openDropdown={openDropdown}
                                    setOpenDropdown={setOpenDropdown}
                                    emptyMessage="Chưa có chuỗi rạp trong hệ thống"
                                    marginAboveLabel="mt-1"
                                />
                            </div>
                            <div className="col-span-3 text-left relative" ref={clusterRef}>
                                <SelectBox
                                    label="Cụm rạp"
                                    value={selectedCluster.name}
                                    placeholder="Chọn cụm rạp"
                                    items={createItems('cluster', cinemaClusters, "Chọn cụm rạp", 'cluster_name', 'cluster_id')}
                                    dropdownKey="cluster"
                                    openDropdown={openDropdown}
                                    setOpenDropdown={setOpenDropdown}
                                    emptyMessage="Chưa có cụm rạp cho chuỗi này"
                                    disabled={!selectedChain.id}
                                    marginAboveLabel="mt-1"
                                />
                            </div>
                            <div className="col-span-3 text-left relative" ref={movieRef}>
                                <SelectBox
                                    label="Phim"
                                    value={selectedMovie.title}
                                    placeholder="Chọn phim"
                                    items={createItems('movie', moviesData, "Chọn phim", 'title', 'movie_id')}
                                    dropdownKey="movie"
                                    openDropdown={openDropdown}
                                    setOpenDropdown={setOpenDropdown}
                                    emptyMessage="Không có phim nào"
                                    marginAboveLabel="mt-1"
                                />
                            </div>
                            <div className="col-span-3 text-left">
                                <label className="block text-sm font-medium text-gray-700 invisible mb-1">Lọc</label>
                                <Button
                                    text="Lọc"
                                    textColor="text-white"
                                    bgColor="bg-blue-500"
                                    hover="hover:bg-blue-600"
                                    fullWidth={true}
                                    onClick={handleFilter}
                                />
                            </div>
                        </div>
                        <ManagementTable
                            columns={columns}
                            data={formattedData}
                            onView={handleView}
                            onAdd={()=>navigate(`${path.ADMIN}/${path.SHOWTIME_MANAGER}/${path.ADD}`)}
                            emptyMessage={showtimesByDate.length === 0 ? msg || "Chưa có suất chiếu. Vui lòng bấm 'Lọc' để xem dữ liệu hoặc thêm mới." : ""}
                            actionOptions={{ showEdit: false, showDelete: false }}
                            imageOptions={{rounded:false, height: 120}}
                        />
                    </ContainerBox>

                    {/* Modal chi tiết */}
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={selectedShowtime}
                        maxWidth='max-w-[1600px]'
                    >
                            {Array.isArray(selectedShowtime) && selectedShowtime.length > 0 ? (
                                <ManagementTable
                                    columns={columnsDetail}
                                    data={selectedShowtime}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    actionOptions={{vertical:true, showView:false}}
                                />
                            ) : (
                                <div>Không có dữ liệu chi tiết.</div>
                            )}
                    </DetailModal>

                    {/* Modal xác nhận xóa */}
                    <Modal
                        isOpen={confirmModal.isOpen}
                        title="Xác nhận xóa suất chiếu"
                        message={`Bạn có chắc chắn muốn xóa suất chiếu này của phim "${confirmModal.movie_title}" không?`}
                        icon={GoQuestion}
                        buttons={[
                            {
                                text: "Huỷ",
                                textColor: "text-black",
                                bgColor: "bg-gray-200",
                                onClick: () => setConfirmModal({ isOpen: false, showtime_id: null })
                            },
                            {
                                text: "Đồng ý",
                                textColor: "text-white",
                                bgColor: "bg-red-500",
                                onClick: confirmDelete
                            }
                        ]}
                    />

                    {/* Modal thông báo kết quả */}
                    <Modal
                        isOpen={resultModal.isOpen}
                        title={resultModal.success ? "Thành công" : "Thất bại"}
                        message={resultModal.msg}
                        icon={resultModal.success ? IoCheckmarkCircle : FaRegFrownOpen}
                        buttons={[
                            {
                                text: "OK",
                                textColor: "text-white",
                                bgColor: "bg-blue-500",
                                onClick: handleCloseResultModal
                            }
                        ]}
                    />
                </div>
            )}
        </>
    );
};

export default ShowtimeManager;