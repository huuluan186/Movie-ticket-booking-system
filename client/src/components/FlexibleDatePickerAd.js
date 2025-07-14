import { useState, useRef } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import icons from '../utils/icon';
import { useClickMouseOutside } from '../hooks'; // em cần hook giống bên Statistic

const { FaCalendarAlt, AiOutlineCloseCircle } = icons;

const FlexibleDatePickerAd = ({
    label,
    value,
    onChange,
    placeholder = 'dd/MM/yyyy',
    error = '',
    keyPayload = '',
    setInvalidFields = null,
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showAbove, setShowAbove] = useState(false);
    const dateRef = useRef(null);

    useClickMouseOutside([dateRef], () => setShowDatePicker(false));

    const hasError = !!error;

    const handleFocus = () => {
        if (setInvalidFields && keyPayload) {
            setInvalidFields((prev) => prev.filter((err) => err.name !== keyPayload));
        }
    };

    const handleToggleDatePicker = () => {
        if (showDatePicker) {
            setShowDatePicker(false);
            return;
        }

        const rect = dateRef.current.getBoundingClientRect();
        const estimatedHeight = 360;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        setShowAbove(spaceBelow < estimatedHeight && spaceAbove > spaceBelow);
        setShowDatePicker(true);
    };

    const handleResetDate = (e) => {
        e.stopPropagation();
        onChange(null);
        setShowDatePicker(false);
    };

    const inputBaseClass =
        'w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 transition-all duration-150 pr-10';
    const errorClass = hasError
        ? 'border-red-500 ring-red-300 placeholder-red-400'
        : 'border-gray-300 ring-blue-300';

    return (
        <div className="space-y-1 w-full max-w-[240px]">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <div className="relative" ref={dateRef}>
                <div
                    onClick={handleToggleDatePicker}
                    onFocus={handleFocus}
                    className={`${inputBaseClass} ${errorClass} flex justify-between items-center bg-white cursor-pointer pl-4 pr-3`}
                >
                    <span className={`flex-1 truncate ${value ? 'text-gray-900' : 'text-gray-400'}`}>
                        {value ? format(new Date(value), 'dd/MM/yyyy') : placeholder}
                    </span>
                    {showDatePicker ? (
                        <AiOutlineCloseCircle
                            className="text-xl text-red-600 cursor-pointer"
                            onClick={handleResetDate}
                        />
                    ) : (
                        <FaCalendarAlt className="text-gray-500" />
                    )}
                </div>

                {showDatePicker && (
                    <div
                        className={`absolute z-50 bg-white transition-all duration-200 ease-in-out ${
                            showAbove ? 'bottom-full mb-1' : 'top-full mt-1'
                        }`}
                    >
                        <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(date) => {
                                onChange(date);
                                setShowDatePicker(false);
                            }}
                            inline
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                )}
                {hasError && <div className="text-red-500 text-sm mt-1">{error}</div>}
            </div>
        </div>
    );
};

export default FlexibleDatePickerAd;
