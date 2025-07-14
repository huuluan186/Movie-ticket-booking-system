import { convertRowToLetter } from '../utils/helpers';

const Seat = ({ seat, onSelect, isSelected, isBooked, normalBorderColor = 'border-green-600', vipBorderColor = 'border-red-600', selectedBgColor = 'bg-red-800', selectedBorderColor = 'border-red-800', selectedTextColor = 'text-white', bookedBgColor = 'bg-black', bookedTextColor = 'text-white',bookedBorderColor= 'border-white', disableHover = false}) => {
    const handleClick = () => {
        if (!isBooked) onSelect(seat);
    };

    // Xác định className dựa trên trạng thái
    const getSeatClass = () => {
        if (isBooked) {
            return `${bookedBgColor} ${bookedTextColor} border-2 ${bookedBorderColor} !cursor-default`;
        } else if (isSelected) {
            return `${selectedBgColor} ${selectedBorderColor} ${selectedTextColor} border-2`;
        } else {
            return `bg-white text-black border-2 ${seat.type === 'VIP' ? vipBorderColor : normalBorderColor}`;
        }
    };

    const getAdditionalClass = () => {
        if (disableHover) {
            return 'hover:bg-opacity-100 cursor-default'; // Loại bỏ hover và cursor: pointer
        }
        return 'hover:bg-opacity-80 cursor-pointer'; // Giữ mặc định cho hover và cursor
    };

    return (
        <button
            key={seat?.seatId}
            onClick={handleClick}
            className={`w-10 h-10 rounded-md flex items-center justify-center text-sm ${getSeatClass()} ${getAdditionalClass()} transition-colors duration-200`}
            disabled={isBooked}
        >
            {`${convertRowToLetter(seat.row)}${seat.column}`}
        </button>
    );
};

export default Seat;