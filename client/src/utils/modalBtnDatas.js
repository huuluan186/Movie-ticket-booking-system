export const getModalButtons = (setOpen, pendingAction) => [
    {
        text: 'Đồng ý',
        textColor: 'text-white',
        bgColor: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        onClick: () => {
            setOpen(false);
            pendingAction?.();   //thực thi hành động đã giữ lại
        }
    },
    {
        text: 'Hủy',
        textColor: 'text-white',
        bgColor: 'bg-red-600',
        hover: 'hover:bg-red-700',
        onClick: () => setOpen(false),
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
