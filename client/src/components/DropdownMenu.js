import { useEffect, useRef, useState } from "react";

const DropdownMenu = ({
    items = [], // Danh sách item để hiển thị trong dropdown (mỗi item có label + onClick)
    onClose,  // Hàm callback khi dropdown đóng (khi click chọn hoặc click ngoài)
    textColor = "",
    fullWidth = false, // Nếu true thì dropdown rộng 100% theo SelectBox cha
    emptyMessage = null,
    showAbove = null,// true = hiển thị lên trên, false = xuống dưới, null = tự động/mặc định
    align = "left", // Căn trái, phải hoặc giữa ("left", "right", "center")
    offsetY=null // để tuỳ chỉnh khoảng cách giữa dropdown và nút trigger (SelectBox).
}) => {
    const menuRef = useRef(null);
    const [animationClass, setAnimationClass] = useState("animate-slide-down");

    // ======== XỬ LÝ VỊ TRÍ DỌC ========
    let verticalClass = "";
    if (showAbove === true) verticalClass = `bottom-full ${offsetY ? offsetY : 'mb-1'}`;
    else if (showAbove === false) verticalClass = "top-full mt-1";
    else verticalClass = "top-full translate-y-2"; // Mặc định: lệch nhẹ xuống dưới


    // ======== XỬ LÝ VỊ TRÍ NGANG ========
    let horizontalClass = "";
    if (showAbove === null) horizontalClass = "left-0 -translate-x-6"; // mặc định lệch trái một chút
    else {
        // nếu đã truyền showAbove thì không lệch
        if (align === "left") horizontalClass = "left-0";
        else if (align === "center") horizontalClass = "left-1/2 -translate-x-1/2";
        else if (align === "right") horizontalClass = "right-0";
    }

    const handleClose = () => {
        setAnimationClass("animate-slide-up");
        setTimeout(() => {
            onClose?.();
        }, 200);
    };

    useEffect(() => {
        setAnimationClass("animate-slide-down");
    }, [items]);

    return (
        <div
            ref={menuRef}
            className={`absolute ${verticalClass} ${horizontalClass} 
                ${fullWidth ? "w-full" : "w-48"} shadow-md rounded-md bg-white z-50 ${textColor}`}
        >
            <ul
                className={`flex flex-col border border-gray-500 shadow-sm rounded-md max-h-60 overflow-y-auto ${animationClass}`}
            >
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <li
                            key={index}
                            className={`px-4 py-2 hover:text-orange-700 cursor-pointer ${
                                index !== items.length - 1 ? "border-b border-gray-300" : ""
                            }`}
                            onMouseDown={(e)=>{
                                e.stopPropagation();
                                item.onClick(); 
                                handleClose(); // Đóng dropdown sau khi chọn
                            }}
                        >
                            <span className="flex items-center gap-2 whitespace-nowrap">
                                {item.icon}
                                {item.label}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="px-4 py-2 text-gray-400 italic text-sm">
                        {emptyMessage ?? "Chưa có dữ liệu trong hệ thống"}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default DropdownMenu;
