import React, {useCallback,useState,useRef} from 'react'
import logo from '../../assets/logo-dark-transparent.png'
import {Button, DropdownMenu, SearchBox} from "../../components";
import { path } from "../../utils/constant";
import {Link,useNavigate} from 'react-router-dom';
import icons from '../../utils/icon'
import { useSelector, useDispatch } from "react-redux";
import { useClickMouseOutside } from '../../hooks';
import { movieMenuItems, userMenuItems } from '../../utils/menuItems';

const {RiArrowDropDownLine, IoPersonCircle} = icons

const Header = () => {
    const {isLoggedIn}=useSelector(state=>state.auth)
    const { currentData } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUserMenuItems = userMenuItems(navigate, dispatch);
    const getMovieMenuItems = movieMenuItems(navigate);

    const goLogin = useCallback((flag)=>{
        navigate(path.LOGIN,
            {state:{
                flag
            }}
        )
    })

    const [isMovieDropdownOpen, setMovieDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const movieDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
  
     // Dùng custom hook để đóng cả 2 dropdown nếu click ra ngoài
     useClickMouseOutside([movieDropdownRef, userDropdownRef], () => {
        setMovieDropdownOpen(false);
        setUserDropdownOpen(false);
    });
    
    

    const toggleMovieDropdown = () => {
        setMovieDropdownOpen(prev => {
            if (!prev) setUserDropdownOpen(false); // Đóng user dropdown nếu đang mở
            return !prev;
        });
    };
    
    const toggleUserDropdown = () => {
        setUserDropdownOpen(prev => {
            if (!prev) setMovieDropdownOpen(false); // Đóng movie dropdown nếu đang mở
            return !prev;
        });
    };


    return (
        <div className='container'>
           <div className="w-full flex items-center justify-between">
                <Link to={'/'} >
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[240px] h-[70px] object-contain'
                    />
                </Link>
                <div className="relative" ref={movieDropdownRef}>
                    <button
                        className="text-black px-4 py-2 rounded-md hover:text-orange-700 flex items-center justify-center gap-1"
                        onClick={toggleMovieDropdown}
                    >
                        <span className='font-medium'>Phim</span>
                        <span><RiArrowDropDownLine/></span>
                    </button>
                    {isMovieDropdownOpen && (
                        <DropdownMenu
                            items={getMovieMenuItems}
                            onClose={() => setMovieDropdownOpen(false)}
                        />
                    )}
                </div>

                <SearchBox/>    

                <div className='flex items-center justify-center gap-4 '>
                    {!isLoggedIn 
                    ?
                    <>
                        <Button text={'Đăng nhập'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500'  onClick={()=>goLogin(false)}/>
                        <Button text={'Đăng ký'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500'  onClick={()=>goLogin(true)}/>   
                    </>  
                    :
                    <>
                        <div className="relative" ref={userDropdownRef}>
                            <Button
                            text={currentData?.username || 'Bạn chưa đăng nhập'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500' onClick={toggleUserDropdown} IcBefore={IoPersonCircle}
                            />
                            {isUserDropdownOpen && (
                                <DropdownMenu
                                    items={getUserMenuItems}
                                    onClose={() => setUserDropdownOpen(false)}
                                />
                            )}
                        </div>
                    </>
                    }
                   
                </div>
           </div>
        </div>
    )
}

export default Header
