// components/SelectBox.jsx
import { DropdownMenu } from '../components';

const SelectBox = ({
    label,
    value,
    placeholder,
    items = [],
    dropdownKey,
    openDropdown,
    showAbove,
    onClick,
    setOpenDropdown,
    disabled = false,
    emptyMessage,
    width = 'w-full', // Default width
}) => (
    <>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div
            onClick={!disabled ? onClick : undefined}
            className={`flex justify-between items-center mt-1 border px-4 py-2 rounded-md cursor-pointer bg-white shadow-sm ${width} ${disabled && 'opacity-50 cursor-not-allowed'}  ${openDropdown === dropdownKey ? 'border-blue-400' : 'border-gray-300 '}`}
        >
            <span className={value ? 'text-black' : 'text-gray-400'}>{value || placeholder}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M7 10l5-5 5 5H7zM17 14l-5 5-5-5h10z" />
            </svg>
        </div>
    {openDropdown === dropdownKey && (
        <DropdownMenu
            textColor="text-black"
            showAbove={showAbove}
            fullWidth
            emptyMessage={emptyMessage}
            onClose={() => setOpenDropdown(null)}
            items={items}
        />
    )}
    </>
);

export default SelectBox;