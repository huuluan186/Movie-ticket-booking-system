import React, { memo } from "react";
import icons from "../utils/icon";
const { FiSearch } = icons;

const SearchBox = () => {
    return (
        <div className="w-[250px] flex items-center border border-gray-300 rounded-full bg-white overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 ">
            <div className="pl-3 text-gray-400">
                <FiSearch />
            </div>
            <input 
                type="text" 
                placeholder="Từ khóa tìm kiếm..." 
                className="w-full p-2 focus:outline-none "
            />
        </div>
    );
};

export default memo(SearchBox);