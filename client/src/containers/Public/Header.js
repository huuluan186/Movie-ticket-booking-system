import React, {useCallback,useState,useEffect,useRef} from 'react'
import logo from '../../assets/logo-dark-transparent.png'
import {Button, DropdownMenu} from "../../components";
import { path } from "../../utils/constant";
import {Link,useNavigate} from 'react-router-dom';
import icons from '../../utils/icon'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions'

const {RiArrowDropDownLine, IoPersonCircle, IoInformationCircleOutline,AiOutlineHistory,IoLogOutOutline} = icons

const Header = () => {
    const {isLoggedIn,currentUser}=useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goLogin = useCallback((flag)=>{
        navigate(path.LOGIN,
            {state:{
                flag
            }}
        )
    })

    const userMenuItems = [
        {
          label: 'Thông tin tài khoản',
          icon: <IoInformationCircleOutline />,
          onClick: () => navigate('/info-user'),
        },
        {
          label: 'Lịch sử giao dịch',
          icon: <AiOutlineHistory />,
          onClick: () => navigate('/history-transaction'),
        },
        {
          label: 'Đăng xuất',
          icon: <IoLogOutOutline />,
          onClick: () =>  dispatch(actions.logout()),
        },
    ];

    const movieMenuItems = [
        {
          label: 'Phim đang chiếu',
          onClick: () => navigate('/now-showing'),
        },
        {
          label: 'Phim sắp chiếu',
          onClick: () => navigate('/coming-soon'),
        }
    ];

    const [isMovieDropdownOpen, setMovieDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const movieDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
    // Tạo một mảng chứa các ref của dropdown
    const dropdownRefs = [movieDropdownRef, userDropdownRef];

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

    // Đóng dropdown khi click ra ngoài
   // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
        // Lấy ra những ref đang mounted (không null)
        const mountedRefs = dropdownRefs.filter(ref => ref.current);
        
        // Sau đó, kiểm tra click có nằm ngoài tất cả những phần tử còn tồn tại không
        const clickedOutsideAll = mountedRefs.every(ref =>
            !ref.current.contains(event.target)
        );
    
        if (clickedOutsideAll) {
            setMovieDropdownOpen(false);
            setUserDropdownOpen(false);
        }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  

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
                            items={movieMenuItems}
                            onClose={() => setMovieDropdownOpen(false)}
                        />
                    )}
                </div>
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
                            text={currentUser || 'Bạn chưa đăng nhập'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500' onClick={toggleUserDropdown} IcBefore={IoPersonCircle}
                            />
                            {isUserDropdownOpen && (
                                <DropdownMenu
                                    items={userMenuItems}
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
