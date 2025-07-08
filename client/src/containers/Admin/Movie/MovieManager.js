import {ManagementTable, TitleHeader, ContainerBox, DetailModal, Modal, MovieInfoItem } from '../../../components';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import {getYouTubeEmbedUrl, formatDate, formatDateTime, getImageUrl} from '../../../utils/helpers';
import { path } from "../../../utils/constant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import icons from '../../../utils/icon';
import { apiDeleteMovie } from '../../../services/movie';
import placeholder from '../../../assets/placeholder.png'

const  {IoCheckmarkCircle, GoQuestion, FaRegFrownOpen} = icons

const MovieManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isNestedPage = location.pathname !== `${path.ADMIN}/${path.MOVIE_MANAGER}`;
    const { moviesData } = useSelector(state => state.movie);

    const [selectedMovie, setSelectedMovie] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Modal xác nhận xóa
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, movie_id: null, title: null });

    //Modal kết quả
    const [resultModal, setResultModal] = useState({ isOpen: false, msg: '', success: false});

    const columns = ['Mã phim', 'Tên phim', 'Quốc gia sản xuất', 'Năm phát hành', 'Thời lượng', 'Thể loại', 'Trạng thái', 'Ngày phát hành', 'Poster'];

    const getVietnameseStatus = (status) => {
        if (status === 'Coming Soon') return 'Sắp chiếu';
        if (status === 'Now Showing') return 'Đang chiếu';
        return status;
    };
    
    const formattedData = moviesData?.map(i => ([
        i.movie_id,
        i.title,
        i.country,
        new Date(i.release_date).getFullYear(), //lấy năm từ release_date
        `${i.duration} phút`,
        i.genre,
        getVietnameseStatus(i.status),
        formatDate(i.release_date),
        getImageUrl(i.poster) || '*Chưa có poster'
    ])) || [];

    
    const handleView = (row) => {
        const movie = moviesData?.find(m => m.movie_id === row[0]);
        if (!movie) return;
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        const movieId = row[0]; 
        navigate(`${path.ADMIN}/${path.MOVIE_MANAGER}/${path.UPDATE.replace(':id', movieId)}`);
    };

    const handleDelete = (row) => {
        setConfirmModal({
            isOpen: true,
            movie_id: row[0],
            title: row[1],
        });
    };

    const confirmDelete = async () => {
        try {
            const response = await apiDeleteMovie(confirmModal.movie_id);
            setConfirmModal({ isOpen: false, movie_id: null });
            setResultModal({isOpen:true,msg:response?.msg || 'Xóa thành công!',success:response?.err===0,})
        } catch (error) {
            const errMsg = error?.response?.data?.msg || 'Đã xảy ra lỗi khi xóa';
            setConfirmModal({ isOpen: false, movie_id: null });
            setResultModal({ isOpen: true, msg: errMsg, success: false, });
        }
    };

    const handleCloseResultModal = () => {
        setResultModal({ isOpen: false, msg: '', success: false });
        dispatch(actions.getMovieList());
    };

    useEffect(() => {
        dispatch(actions.getMovieList());
    }, [dispatch]);

    return (
       <>
            {isNestedPage  ? (
                <Outlet /> // chỉ hiển thị phần outlet mà không render layout cũ
            ) : (
                <>
                    <div className='space-y-4'>
                        <ContainerBox>
                            <TitleHeader title="Quản lý phim"/>
                        </ContainerBox>
                        <ContainerBox>
                            <ManagementTable
                                columns = {columns}
                                data = {formattedData}
                                onAdd={()=>navigate(`${path.ADMIN}/${path.MOVIE_MANAGER}/${path.ADD}`)}
                                onEdit={handleEdit}
                                onView = {handleView}
                                onDelete={handleDelete}
                                actionOptions={{ vertical: true }}
                                imageOptions={{rounded:false, height: 120}}
                            />
                        </ContainerBox>
                    </div>
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={selectedMovie}
                    >
                        {selectedMovie?.movie_id && (
                            <div className="space-y-9 text-base">
                            {/* Dòng 1: Poster + Thông tin */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Poster bên trái */}
                                    <div className="flex justify-center">
                                        <div className="w-full max-w-[600px] h-[450px] flex items-center justify-center">
                                            <img
                                                src={getImageUrl(selectedMovie?.poster) || placeholder}
                                                alt={selectedMovie.title}
                                                className="h-full object-contain rounded-md shadow-md"
                                            />
                                        </div>
                                    </div>
                                
                                {/* Thông tin bên phải */}
                                <div className="space-y-2">
                                    <MovieInfoItem label="Mã phim" value={selectedMovie.movie_id} />
                                    <MovieInfoItem label="Tên phim" value={selectedMovie.title} />
                                    <MovieInfoItem label="Quốc gia" value={selectedMovie.country} />
                                    <MovieInfoItem label="Thể loại" value={selectedMovie.genre} />
                                    <MovieInfoItem label="Thời lượng" value={`${selectedMovie.duration} phút`} />
                                    <MovieInfoItem label="Đạo diễn" value={selectedMovie.director} />
                                    <MovieInfoItem label="Diễn viên" value={selectedMovie.cast} />
                                    <MovieInfoItem label="Năm phát hành" value={new Date(selectedMovie.release_date).getFullYear()} />
                                    <MovieInfoItem label="Trạng thái" value={getVietnameseStatus(selectedMovie.status)} />
                                    <MovieInfoItem label="Ngày phát hành" value={formatDate(selectedMovie.release_date)} />
                                    <MovieInfoItem label="Nhãn giới hạn độ tuổi" value={selectedMovie.age_limit} />
                                    <MovieInfoItem label="Mô tả nội dung" value={selectedMovie.description} />
                                    <MovieInfoItem label="Thời gian tạo" value={formatDateTime(selectedMovie.createdAt)} />
                                    <MovieInfoItem label="Cập nhật lần cuối" value={formatDateTime(selectedMovie.updatedAt)} />
                                </div>
                            </div>

                            {/* Dòng 2: Trailer */}
                            {selectedMovie.linkTrailer && (
                                <div className="aspect-video -mx-6">
                                    <iframe
                                        src={getYouTubeEmbedUrl(selectedMovie.linkTrailer)}
                                        title="Trailer"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            )}
                            </div>
                        )}
                    </DetailModal>
                    {/* Modal xác nhận xóa */}
                    <Modal
                        isOpen={confirmModal.isOpen}
                        title="Xác nhận xoá phim"
                        message={`Bạn có chắc chắn muốn xoá phim "${confirmModal.title}" không?`}
                        icon={GoQuestion}
                        buttons={[
                            {
                                text: "Huỷ",
                                textColor: "text-black",
                                bgColor: "bg-gray-200",
                                onClick: () => setConfirmModal({ isOpen: false, movie_id: null })
                            },
                            {
                                text: "Đồng ý",
                                textColor: "text-white",
                                bgColor: "bg-red-500",
                                onClick: confirmDelete
                            }
                        ]}
                    />

                    {/* Modal thông báo kết quả từ API */}
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
                </>
            )}
        </>
    );
};

export default MovieManager;
