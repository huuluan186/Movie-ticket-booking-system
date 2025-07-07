import {ManagementTable, TitleHeader, ContainerBox, DetailModal, Modal} from '../../../components';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import {formatDateTime, getImageUrl, isImageUrl} from '../../../utils/helpers';
import { path } from "../../../utils/constant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import icons from '../../../utils/icon';
import placehoder from '../../../assets/placeholder.png'
import {apiDeleteCinemaChain} from '../../../services/cinema'

const  {IoCheckmarkCircle, GoQuestion, FaRegFrownOpen} = icons

const CinemaChainManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isNestedPage = location.pathname !== `${path.ADMIN}/${path.CINEMA_CHAIN_MANAGER}`;
    const { cinemaChains } = useSelector(state => state.cinema);

    const [selectedChain, setSelectedChain] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Modal xác nhận xóa
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, chain_id: null, chain_name: null });

    //Modal kết quả
    const [resultModal, setResultModal] = useState({
        isOpen: false,
        msg: '',
        success: false,
    });

    const columns = ['Mã chuỗi rạp', 'Tên chuỗi rạp', 'Logo'];
    const formattedData = cinemaChains?.map(i => ([
        i.chain_id,
        i.chain_name,
        getImageUrl(i.logo) || '*Chưa có ảnh logo',
    ])) || [];

    const handleView = (row) => {
        const chainDetail = {};
        columns.forEach((col, index) => {
            chainDetail[col] = row[index];
        });
        chainDetail['Thời gian tạo'] = formatDateTime(cinemaChains?.find(u => u.chain_id === row[0])?.createdAt);
        chainDetail['Cập nhật lần cuối'] = formatDateTime(cinemaChains?.find(u => u.chain_id === row[0])?.updatedAt);
        setSelectedChain(chainDetail);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        const chainId = row[0]; 
        navigate(`${path.ADMIN}/${path.CINEMA_CHAIN_MANAGER}/${path.UPDATE.replace(':id', chainId)}`);
    };

    const handleDelete = (row) => {
        setConfirmModal({
            isOpen: true,
            chain_id: row[0],
            chain_name: row[1],
        });
    };

    const confirmDelete = async () => {
        try {
            const response = await apiDeleteCinemaChain(confirmModal.chain_id);
            setConfirmModal({ isOpen: false, chain_id: null });
            setResultModal({ isOpen: true, msg: response?.msg || 'Xóa thành công!', success: response?.err === 0,});
        } catch (error) {
            const errMsg = error?.response?.data?.msg || 'Đã xảy ra lỗi khi xóa';
            setConfirmModal({ isOpen: false, chain_id: null });
            setResultModal({ isOpen: true, msg: errMsg, success: false, });
        }
    };

    const handleCloseResultModal = () => {
        setResultModal({ isOpen: false, msg: '', success: false });
        dispatch(actions.getAllCinemaChains());
    };

    useEffect(() => {
        dispatch(actions.getAllCinemaChains());
    }, [dispatch]);

    const renderLogo = () => {
        const imageEntry = Object.entries(selectedChain).find(([, value]) => isImageUrl(value));

        const imageUrl = imageEntry?.[1] || placehoder;

        return (
            <img
                src={imageUrl}
                alt="logo"
                className="w-40 h-40 object-contain border shadow"
            />
        );
    };


    return (
       <>
            {isNestedPage  ? (
                <Outlet /> // chỉ hiển thị phần outlet mà không render layout cũ
            ) : (
                <>
                    <div className='space-y-4'>
                        <ContainerBox>
                            <TitleHeader title="Quản lý hệ thống rạp"/>
                        </ContainerBox>
                        <ContainerBox>
                            <ManagementTable
                                columns = {columns}
                                data = {formattedData}
                                onAdd={()=>navigate(`${path.ADMIN}/${path.CINEMA_CHAIN_MANAGER}/${path.ADD}`)}
                                onEdit={handleEdit}
                                onView = {handleView}
                                onDelete={handleDelete}
                            />
                        </ContainerBox>
                    </div>
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={selectedChain}
                    >
                        <div className="grid grid-cols-3 gap-6 text-sm">
                            {/* Cột trái: ảnh logo */}
                            <div className="col-span-1 flex justify-center items-start">
                                {renderLogo()}
                            </div>
                            {/* Cột phải: thông tin chi tiết */}
                            <div className="col-span-2 space-y-2">
                                {Object.entries(selectedChain).map(([label, value], idx) => {
                                    // Bỏ qua nếu là ảnh
                                    if (isImageUrl(value)) return null;
                    
                                    return (
                                        <div key={idx} className="border-b py-2">
                                            <strong>{label}:</strong> {value}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </DetailModal>
                    {/* Modal xác nhận xóa */}
                    <Modal
                        isOpen={confirmModal.isOpen}
                        title="Xác nhận xoá chuỗi rạp"
                        message={`Bạn có chắc chắn muốn xoá chuỗi rạp "${confirmModal.chain_name}" không?`}
                        icon={GoQuestion}
                        buttons={[
                            {
                                text: "Huỷ",
                                textColor: "text-black",
                                bgColor: "bg-gray-200",
                                onClick: () => setConfirmModal({ isOpen: false, chain_id: null })
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

export default CinemaChainManager;
