const DetailModal = ({maxWidth='max-w-3xl', isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg shadow-lg w-[90%] ${maxWidth} h-[90%] max-h-[100%] flex flex-col overflow-hidden`}>
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-1 border-b">
                    <h2 className="text-blue-600 text-lg font-semibold">Chi tiết</h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-600 text-2xl font-bold"
                    >
                        X
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-scroll px-6 py-4 text-sm scrollbar-hide"
                    style={{
                        WebkitOverflowScrolling: 'touch', // Hỗ trợ cuộn mượt trên iOS
                        WebkitScrollbar: 'none', // Ẩn scrollbar trên Webkit (Chrome, Safari)
                        scrollbarWidth: 'none', // Ẩn scrollbar trên Firefox
                        msOverflowStyle: 'none', // Ẩn scrollbar trên IE/Edge
                    }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DetailModal;