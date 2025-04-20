import { useEffect } from "react";

// refs: mảng các ref cần theo dõi
// callback: hàm gọi khi click ra ngoài tất cả
const useClickMouseOutside = (refs, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            const mountedRefs = refs.filter(ref => ref?.current);

            const clickedOutsideAll = mountedRefs.every(ref =>
                !ref.current.contains(event.target)
            );

            if (clickedOutsideAll) {
                callback?.();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, callback]); // đảm bảo chạy lại nếu refs hoặc callback đổi
};

export default useClickMouseOutside;
