import { useRef, useState } from 'react';
import { DropdownMenu } from '../components';
import icons from '../utils/icon'

const {TiArrowUnsorted}=icons

const SelectBox = ({
    label,  // Nhãn hiển thị phía trên (vd: "Chọn cụm rạp")
    value,   // Giá trị hiện tại được chọn
    placeholder,
    items = [],
    dropdownKey,  // Mỗi SelectBox có một key riêng để quản lý mở/đóng độc lập
    openDropdown, // Trạng thái key hiện đang mở (so sánh với dropdownKey)
    setOpenDropdown, // để cập nhật trạng thái mở dropdown
    setShowDatePicker = () => {}, // Callback tắt DatePicker khi mở dropdown
    disabled = false,
    emptyMessage,
    width = 'w-full', // Chiều rộng SelectBox
    offsetY = null, //Prop truyền xuống DropdownMenu để điều chỉnh khoảng cách theo chiều dọc
    error = '', //lỗi khi validation
    keyPayload = '', 
    setInvalidFields = null,
    marginAboveLabel='' // Prop để tùy chỉnh khoảng cách với label phía trên (mặc định rỗng)
}) => {
    const containerRef = useRef();
    const [showAbove, setShowAbove] = useState(false);

    const handleClick = () => {
        if (disabled) return;
        if (openDropdown === dropdownKey) {
            setOpenDropdown(null);
            return;
        }
        
        if (setInvalidFields && keyPayload) {
            setInvalidFields(prev => prev.filter(err => err.name !== keyPayload));
        }
        // Tắt các thành phần khác (như date picker)
        setShowDatePicker(false);

        // Tính toán tự động vị trí dropdown
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const estimatedDropdownHeight = 300;
        const shouldShowAbove = spaceBelow < estimatedDropdownHeight;
        setShowAbove(shouldShowAbove);

        setOpenDropdown(prev => (prev === dropdownKey ? null : dropdownKey));
        setShowDatePicker(false);
    };
    return (
        <div ref={containerRef} className="relative">
            {<label className="block text-sm font-medium text-gray-700">{label}</label>}
            <div
                onClick={handleClick}
                className={`flex justify-between items-center border ${marginAboveLabel} px-4 py-2 rounded-md cursor-pointer bg-white shadow-sm ${width} ${disabled && 'opacity-50 cursor-not-allowed'}  ${error ? 'border-red-500 focus:ring-1 focus:ring-red-300' : openDropdown === dropdownKey ? 'border-blue-400' : 'border-gray-300'}
                `}
            >
                <span 
                    title={value || placeholder} 
                    className={`${value ? 'text-black' : 'text-gray-400'} truncate max-w-[85%]`}
                >
                    {value || placeholder}
                </span>
                <TiArrowUnsorted/>
            </div>
        {openDropdown === dropdownKey && (
            <DropdownMenu
                textColor="text-black"
                showAbove={showAbove}
                fullWidth
                emptyMessage={emptyMessage}
                onClose={() => setOpenDropdown(null)}
                items={items}
                offsetY={offsetY}
            />
        )}
        {error && (
            <p className="text-red-500 text-sm">{error}</p>
        )}
        </div>
    ) 
};

export default SelectBox;