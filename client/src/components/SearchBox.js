import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../utils/icon";
import { path } from "../utils/constant";

const { FiSearch } = icons;

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // Tìm placeholder động (bất kỳ :tên nào trong path.SEARCH)
            const placeholder = path.SEARCH.match(/:(\w+)/)?.[1] || 'keyword';
             // Thay khoảng trắng bằng '+' thay vì encodeURIComponent
            const formattedQuery = query.trim().replace(/\s+/g, '+');
            const searchPath = path.SEARCH.replace(`:${placeholder}`, formattedQuery);
            navigate(searchPath);
            setQuery('');
        }
    };

    return (
        <form 
            onSubmit={handleSearch}
            className="w-[250px] flex items-center border border-gray-300 rounded-full bg-white overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 "
        >
            <div className="pl-3 text-gray-400">
                <FiSearch />
            </div>
            <input 
                type="text" 
                placeholder="Từ khóa tìm kiếm..." 
                className="w-full p-2 focus:outline-none"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
        </form>
    );
};

export default memo(SearchBox);