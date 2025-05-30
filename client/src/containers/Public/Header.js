import {useCallback,useState,useRef,useEffect} from 'react'
import logo from '../../assets/logo-dark-transparent.png'
import {Button, DropdownMenu, SearchBox} from "../../components";
import { path } from "../../utils/constant";
import {Link, useNavigate, NavLink, useLocation} from 'react-router-dom';
import icons from '../../utils/icon'
import { toSlug } from '../../utils/toSlug';
import { useSelector, useDispatch } from "react-redux";
import { useClickMouseOutside } from '../../hooks';
import { userMenuItems } from '../../utils/menuItems';
import { apiGetMovieStatuses } from '../../services/movie';

const {RiArrowDropDownLine, IoPersonCircle} = icons
const active = "font-medium text-xl text-orange-700"
const notActive = "font-medium text-xl text-gray-600 hover:text-black"
const Header = () => {
    const {isLoggedIn}=useSelector(state=>state.auth)
    const { currentData } = useSelector(state => state.user)
    const [categories, setCategories]=useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    const getUserMenuItems = userMenuItems(navigate, dispatch);

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

    useEffect(()=>{
        const fetchCategories = async ()=>{
            const response = await apiGetMovieStatuses()
            if(response?.data.err===0){
                setCategories(response.data.response)
            }
        }
        fetchCategories()
    },[])

    // Kiểm tra nếu URL hiện tại bắt đầu bằng "/movies" để làm "Phim" active
    const isMoviesActive = location.pathname.startsWith('/movies');

    return (
        <div className='container px-4'>
           <div className="w-full flex items-center justify-between">
                <Link to={'/'} >
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[240px] h-[70px] object-contain'
                    />
                </Link>
                <NavLink to={path.SHOWTIME} end className={({isActive})=> isActive ?` ${active}` : `${notActive}`}>
                    Lịch chiếu
                </NavLink>
                <div className="relative" ref={movieDropdownRef}>
                    <button
                        className={`px-4 py-2 rounded-md flex items-center justify-center gap-1 
                                    ${ isMoviesActive ? `${active}`: `${notActive}` } `}
                        onClick={toggleMovieDropdown}
                    >
                        <span className='font-medium text-xl'>Phim</span>
                        <span className='text-xl'><RiArrowDropDownLine/></span>
                    </button>
                {isMovieDropdownOpen && (
                    <DropdownMenu
                        items={categories.map(item => ({
                            label: item.vietnameseValue,
                            onClick: () => {
                                navigate(`/movies/${toSlug(item.englishValue)}`)
                                setMovieDropdownOpen(false)
                            }
                        }))}
                        onClose={() => setMovieDropdownOpen(false)}
                    />
                )}
            </div>

            <SearchBox/>    

            <div className='flex items-center justify-center gap-4 '>
                {!isLoggedIn 
                ?
                <>
                    <Button text={'Đăng nhập'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500' onClick={()=>goLogin(false)}/>
                    <Button text={'Đăng ký'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500' onClick={()=>goLogin(true)}/>   
                </>  
                :
                <>
                    <div className="relative" ref={userDropdownRef}>
                        <Button
                            text={currentData?.username || 'Bạn chưa đăng nhập'} textColor='text-black' bgColor='bg-white' outline='outline outline-2 outline-orange-500' onClick={toggleUserDropdown} IcBefore={IoPersonCircle} IcAfter={RiArrowDropDownLine}  
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