import {ManagementTable, TitleHeader, ContainerBox, DetailModal, Modal} from '../../../components';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import {formatDateTime} from '../../../utils/helpers';
import { path } from "../../../utils/constant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import icons from '../../../utils/icon';
import { apiDeleteCinemaCluster } from '../../../services/cinema';

const  {IoCheckmarkCircle, GoQuestion, FaRegFrownOpen} = icons

const CinemaClusterManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isNestedPage = location.pathname !== `${path.ADMIN}/${path.CINEMA_CLUSTER_MANAGER}`;
    const { allCinemaClusters } = useSelector(state => state.cinema);

    const [selectedCluster, setSelectedCluster] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Modal xác nhận xóa
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, cluster_id: null, cluster_name: null });

    //Modal kết quả
    const [resultModal, setResultModal] = useState({ isOpen: false, msg: '', success: false});

    const columns = ['Mã cụm rạp', 'Tên cụm rạp', 'Địa chỉ', 'Thuộc chuỗi rạp'];
    const formattedData = allCinemaClusters?.map(i => ([
        i.cluster_id,
        i.cluster_name,
        i.address,
        i.cinema_chain?.chain_name
    ])) || [];

    const handleView = (row) => {
        const clusterDetail = {};
        columns.forEach((col, index) => {
            clusterDetail[col] = row[index];
        });
        clusterDetail['Thời gian tạo'] = formatDateTime(allCinemaClusters?.find(u => u.cluster_id === row[0])?.createdAt);
        clusterDetail['Cập nhật lần cuối'] = formatDateTime(allCinemaClusters?.find(u => u.cluster_id === row[0])?.updatedAt);
        setSelectedCluster(clusterDetail);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        const cluterId = row[0]; 
        navigate(`${path.ADMIN}/${path.CINEMA_CLUSTER_MANAGER}/${path.UPDATE.replace(':id', cluterId)}`);
    };

    const handleDelete = (row) => {
        setConfirmModal({
            isOpen: true,
            cluster_id: row[0],
            cluster_name: row[1],
        });
    };

    const confirmDelete = async () => {
        try {
            const response = await apiDeleteCinemaCluster(confirmModal.cluster_id);
            setConfirmModal({ isOpen: false, cluster_id: null });
            setResultModal({isOpen:true,msg:response?.msg || 'Xóa thành công!',success:response?.err===0,})
        } catch (error) {
            const errMsg = error?.response?.data?.msg || 'Đã xảy ra lỗi khi xóa';
            setConfirmModal({ isOpen: false, cluster_id: null });
            setResultModal({ isOpen: true, msg: errMsg, success: false, });
        }
    };

    const handleCloseResultModal = () => {
        setResultModal({ isOpen: false, msg: '', success: false });
        dispatch(actions.getAllCinemaClusters());
    };

    useEffect(() => {
        dispatch(actions.getAllCinemaClusters());
    }, [dispatch]);


    return (
       <>
            {isNestedPage  ? (
                <Outlet /> // chỉ hiển thị phần outlet mà không render layout cũ
            ) : (
                <>
                    <div className='space-y-4'>
                        <ContainerBox>
                            <TitleHeader title="Quản lý cụm rạp"/>
                        </ContainerBox>
                        <ContainerBox>
                            <ManagementTable
                                columns = {columns}
                                data = {formattedData}
                                onAdd={()=>navigate(`${path.ADMIN}/${path.CINEMA_CLUSTER_MANAGER}/${path.ADD}`)}
                                onEdit={handleEdit}
                                onView = {handleView}
                                onDelete={handleDelete}
                            />
                        </ContainerBox>
                    </div>
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={selectedCluster}
                    >
                        <div className="space-y-2 text-sm">
                            {Object.entries(selectedCluster).map(([label, value], idx) => (
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
                        message={`Bạn có chắc chắn muốn xoá cụm rạp "${confirmModal.cluster_name}" không?`}
                        icon={GoQuestion}
                        buttons={[
                            {
                                text: "Huỷ",
                                textColor: "text-black",
                                bgColor: "bg-gray-200",
                                onClick: () => setConfirmModal({ isOpen: false, cluster_id: null })
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

export default CinemaClusterManager;
