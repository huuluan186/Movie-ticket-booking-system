export const getModalButtons = (setIsModalOpen, navigate, showtimeId) => [
    {
        text: 'Đồng ý',
        textColor: 'text-white',
        bgColor: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        onClick: () => {
            setIsModalOpen(false);
            navigate('/login',{state:{showtimeId}});
        }
    },
    {
        text: 'Hủy',
        textColor: 'text-white',
        bgColor: 'bg-red-600',
        hover: 'hover:bg-red-700',
        onClick: () => setIsModalOpen(false),
    },
];

export const getConfirmPaymentButtons = (setShowConfirmModal, handleConfirmPayment) => [
    {
        text: 'Đồng ý',
        textColor: 'text-white',
        bgColor: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        onClick: handleConfirmPayment,
    },
    {
        text: 'Hủy',
        textColor: 'text-white',
        bgColor: 'bg-red-600',
        hover: 'hover:bg-red-700',
        onClick: () => setShowConfirmModal(false),
    },
];
