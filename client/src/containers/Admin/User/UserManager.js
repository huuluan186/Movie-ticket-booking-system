import {ManagementTable, TitleHeader, ContainerBox, DetailModal, Modal} from '../../../components';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import {formatDateTime} from '../../../utils/helpers';
import { path } from "../../../utils/constant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiDeleteUser } from '../../../services/user';
import icons from '../../../utils/icon';

const  {IoCheckmarkCircle, GoQuestion, FaRegFrownOpen} = icons

const UserManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isNestedPage = location.pathname !== `${path.ADMIN}/${path.USER_MANAGER}`;
    const { usersListData } = useSelector(state => state.user);

    const [selectedUser, setSelectedUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Modal xác nhận xóa
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        user_id: null,
    });

    //Modal kết quả
    const [resultModal, setResultModal] = useState({
        isOpen: false,
        msg: '',
        success: false,
    });

    const columns = ['Mã người dùng', 'Tên người dùng', 'Email', 'Số điện thoại', 'Vai trò'];
    const formattedData = usersListData?.rows?.map(i => ([
        i.user_id, //row[0]
        i.username,
        i.email,
        i.phone,
        i.user_role, //row[4]
    ])) || [];

    const handleView = (row) => {
        const userDetail = {};
        columns.forEach((col, index) => {
            userDetail[col] = row[index];
        });
        userDetail['Thời gian tạo'] = formatDateTime(usersListData?.rows?.find(u => u.user_id === row[0])?.createdAt);
        userDetail['Cập nhật lần cuối'] = formatDateTime(usersListData?.rows?.find(u => u.user_id === row[0])?.updatedAt);
        setSelectedUser(userDetail);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        const userId = row[0]; // Mã người dùng là phần tử đầu tiên
        navigate(`${path.ADMIN}/${path.USER_MANAGER}/${path.UPDATE.replace(':id', userId)}`);
    };

    const handleDelete = (row) => {
        setConfirmModal({
            isOpen: true,
            user_id: row[0],
            username: row[1]
        });
    };

    const confirmDelete = async () => {
        try {
            const response = await apiDeleteUser(confirmModal.user_id);
            setConfirmModal({ isOpen: false, user_id: null });
            setResultModal({
                isOpen: true,
                msg: response?.msg || 'Xóa thành công!',
                success: response?.err === 0,
            });
        } catch (error) {
            const errMsg = error?.response?.data?.msg || 'Đã xảy ra lỗi khi xóa người dùng';
            setConfirmModal({ isOpen: false, user_id: null });
            setResultModal({
                isOpen: true,
                msg: errMsg,
                success: false,
            });
        }
    };

    const handleCloseResultModal = () => {
        setResultModal({ isOpen: false, msg: '', success: false });
        dispatch(actions.getUsersList());
    };

    useEffect(() => {
        dispatch(actions.getUsersList());
    }, [dispatch]);

    return (
       <>
            {isNestedPage  ? (
                <Outlet /> // chỉ hiển thị phần outlet mà không render layout cũ
            ) : (
                <>
                    <div className='space-y-4'>
                        <ContainerBox>
                            <TitleHeader title="Quản lý người dùng"/>
                        </ContainerBox>
                        <ContainerBox>
                            <ManagementTable
                                columns = {columns}
                                data = {formattedData}
                                onAdd={()=>navigate(`${path.ADMIN}/${path.USER_MANAGER}/${path.ADD}`)}
                                onEdit={handleEdit}
                                onView = {handleView}
                                onDelete={handleDelete}
                            />
                        </ContainerBox>
                    </div>
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={selectedUser}
                    >
                        <div className="space-y-2 text-sm">
                            {Object.entries(selectedUser).map(([label, value], idx) => (
                                <div key={idx} className="border-b py-3">
                                    <strong>{label}: </strong> {value}
                                </div>
                            ))}
                        </div>
                    </DetailModal>
                    {/* Modal xác nhận xóa */}
                    <Modal
                        isOpen={confirmModal.isOpen}
                        title="Xác nhận xoá người dùng"
                        message={`Bạn có chắc chắn muốn xoá người dùng "${confirmModal.username}" không?`}
                        icon={GoQuestion}
                        buttons={[
                            {
                                text: "Huỷ",
                                textColor: "text-black",
                                bgColor: "bg-gray-200",
                                onClick: () => setConfirmModal({ isOpen: false, user_id: null })
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

export default UserManager;
