import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const FlexibleDatePicker = ({
    label,
    type = 'date', // 'date' | 'multi-date'
    value,
    onChange,
}) => {
    const [newDate, setNewDate] = useState(new Date());
    const [newTime, setNewTime] = useState('');

    const handleAddShowtime = () => {
        if (!newDate || !newTime) return;

        const formatted = `${format(newDate, 'yyyy-MM-dd')} ${newTime}`;
        if (!value.includes(formatted)) {
        onChange([...value, formatted]);
        }
    };

    const handleRemove = (val) => {
        onChange(value.filter((v) => v !== val));
    };

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {type === 'date' ? (
                <DatePicker
                    selected={value}
                    onChange={(date) => onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
            ) : (
                <>
                    <div className="flex gap-2">
                        <DatePicker
                            selected={newDate}
                            onChange={(date) => setNewDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="time"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={handleAddShowtime}
                        >
                            Thêm
                        </button>
                    </div>
                    <ul className="mt-2 space-y-1">
                    {value.map((v, idx) => (
                        <li
                            key={idx}
                            className="flex justify-between items-center border px-3 py-1 rounded-md bg-gray-50"
                        >
                            <span>{v}</span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemove(v)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default FlexibleDatePicker;
