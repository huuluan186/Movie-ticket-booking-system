import {ManagementTable, TitleHeader, ContainerBox, DetailModal, Modal} from '../../../components';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import {formatDateTime} from '../../../utils/helpers';
import { path } from "../../../utils/constant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import icons from '../../../utils/icon';
import { apiDeleteCinema } from '../../../services/cinema';

const  {IoCheckmarkCircle, GoQuestion, FaRegFrownOpen} = icons

const CinemaManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isNestedPage = location.pathname !== `${path.ADMIN}/${path.CINEMA_MANAGER}`;
    const { allCinemas } = useSelector(state => state.cinema);

    const [selectedCinema, setSelectedCinema] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Modal xác nhận xóa
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, cinema_id: null, cinema_name: null });

    //Modal kết quả
    const [resultModal, setResultModal] = useState({ isOpen: false, msg: '', success: false});

    const columns = ['Mã rạp', 'Tên rạp', 'Số lượng ghế', 'Thuộc cụm rạp'];
    const formattedData = allCinemas?.map(i => ([
        i.cinema_id,
        i.cinema_name,
        i.rowCount * i.columnCount,
        i.cinema_cluster?.cluster_name
    ])) || [];

    const handleView = (row) => {
        const cinema = allCinemas?.find(c => c.cinema_id === row[0]);
        if (!cinema) return;

        const detail = {
            'Mã rạp': cinema.cinema_id,
            'Tên rạp': cinema.cinema_name,
            'Số lượng hàng ghế': cinema.rowCount,
            'Số lượng cột ghế': cinema.columnCount,
            'Tổng số ghế': cinema.rowCount * cinema.columnCount,
            'Thuộc cụm rạp': cinema.cinema_cluster?.cluster_name || 'Chưa rõ',
            'Thuộc chuỗi rạp': cinema.cinema_cluster?.cinema_chain?.chain_name || 'Chưa rõ',
            'Thời gian tạo': formatDateTime(cinema.createdAt),
            'Cập nhật lần cuối': formatDateTime(cinema.updatedAt),
        };

        setSelectedCinema(detail);
        setIsModalOpen(true);
    };


    const handleEdit = (row) => {
        const cinemaId = row[0]; 
        navigate(`${path.ADMIN}/${path.CINEMA_MANAGER}/${path.UPDATE.replace(':id', cinemaId)}`);
    };

    const handleDelete = (row) => {
        setConfirmModal({
            isOpen: true,
            cinema_id: row[0],
            cinema_name: row[1],
        });
    };

    const confirmDelete = async () => {
        try {
            const response = await apiDeleteCinema(confirmModal.cinema_id);
            setConfirmModal({ isOpen: false, cinema_id: null });
            setResultModal({isOpen:true,msg:response?.msg || 'Xóa thành công!',success:response?.err===0,})
        } catch (error) {
            const errMsg = error?.response?.data?.msg || 'Đã xảy ra lỗi khi xóa';
            setConfirmModal({ isOpen: false, chain_id: null });
            setResultModal({ isOpen: true, msg: errMsg, success: false, });
        }
    };

    const handleCloseResultModal = () => {
        setResultModal({ isOpen: false, msg: '', success: false });
        dispatch(actions.getAllCinemas());
    };

    useEffect(() => {
        dispatch(actions.getAllCinemas());
    }, [dispatch]);

    return (
       <>
            {isNestedPage  ? (
                <Outlet /> // chỉ hiển thị phần outlet mà không render layout cũ
            ) : (
                <>
                    <div className='space-y-4'>
                        <ContainerBox>
                            <TitleHeader title="Quản lý rạp"/>
                        </ContainerBox>
                        <ContainerBox>
                            <ManagementTable
                                columns = {columns}
                                data = {formattedData}
                                onAdd={()=>navigate(`${path.ADMIN}/${path.CINEMA_MANAGER}/${path.ADD}`)}
                                onEdit={handleEdit}
                                onView = {handleView}
                                onDelete={handleDelete}
                            />
                        </ContainerBox>
                    </div>
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={selectedCinema}
                    >
                        <div className="space-y-2 text-sm">
                            {Object.entries(selectedCinema).map(([label, value], idx) => (
                                <div key={idx} className="border-b py-3">
                                    <strong>{label}: </strong> {value}
                                </div>
                            ))}
                        </div>
                    </DetailModal>
                    {/* Modal xác nhận xóa */}
                    <Modal
                        isOpen={confirmModal.isOpen}
                        title="Xác nhận xoá cụm rạp"
                        message={`Bạn có chắc chắn muốn xoá rạp "${confirmModal.cinema_name}" không?`}
                        icon={GoQuestion}
                        buttons={[
                            {
                                text: "Huỷ",
                                textColor: "text-black",
                                bgColor: "bg-gray-200",
                                onClick: () => setConfirmModal({ isOpen: false, cinema_id: null })
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

export default CinemaManager;
