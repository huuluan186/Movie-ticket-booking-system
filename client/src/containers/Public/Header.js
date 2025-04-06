import React, {useCallback,useState,useEffect,useRef} from 'react'
import logo from '../../assets/logo-dark-transparent.png'
import {Button} from "../../components";
import { path } from "../../utils/constant";
import {Link,useNavigate} from 'react-router-dom';
import icons from '../../utils/icon'

const {RiArrowDropDownLine} = icons

const Header = () => {

    const navigate = useNavigate()
    const goLogin = useCallback(()=>{
        navigate(path.LOGIN)
    },[navigate])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Tạo ref để tham chiếu đến dropdown

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-[80%] border border-red-500 '>
           <div className="w-full flex items-center justify-between">
                <Link to={'/'} >
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[240px] h-[70px] border border-red-500'
                    />
                </Link>
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="text-black px-4 py-2 rounded-md hover:text-orange-700 flex items-center justify-center gap-1"
                        onClick={toggleDropdown}
                    >
                        <span className='font-medium'>Phim</span>
                        <span><RiArrowDropDownLine/></span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 shadow-md rounded-md bg-primary z-50">
                            <ul className="flex flex-col">
                                <li
                                    className="px-4 py-2 hover:text-orange-700 cursor-pointer"
                                    onClick={() => navigate('/now-showing')}
                                >
                                    Phim đang chiếu
                                </li>
                                <li
                                    className="px-4 py-2 hover:text-orange-700 cursor-pointer"
                                    onClick={() => navigate('/coming-soon')}
                                >
                                    Phim sắp chiếu
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className='flex items-center justify-center  gap-4 '>
                    <Button text={'Đăng nhập'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500' onClick={goLogin}/>
                    <Button text={'Đăng ký'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500' onClick={goLogin}/>    
                </div>
           </div>
        </div>
    )
}

export default Header
