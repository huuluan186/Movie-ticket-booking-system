import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useRequireLogin = () => {
    const { isLoggedIn } = useSelector(s => s.auth);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    const checkLoginBefore = (
        action,
        redirectTo = '/',
        extraState = {},
        { showModal = true } = {}          // ← tuỳ chọn mới
    ) => {
        if (isLoggedIn) {
            action();                        // đã login → chạy luôn
        } else if (showModal) {
            // 1. Cần modal
            setPendingAction(() => () => {
                navigate('/login', { state: { redirectTo, ...extraState } });
            });
            setModalOpen(true);              // hiển thị modal
        } else {
            // 2. Không cần modal → đi login ngay
            navigate('/login', { state: { redirectTo, ...extraState } });
        }
    };

    return { checkLoginBefore, modalOpen, setModalOpen, pendingAction };
};

export default useRequireLogin;
