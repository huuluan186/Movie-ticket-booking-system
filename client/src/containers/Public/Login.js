import React, {useState,useEffect}  from "react";
import { useLocation, useNavigate} from "react-router-dom";
import {Button,InputForm} from '../../components'
import icons from "../../utils/icon";
import * as actions from '../../store/actions'
import { useDispatch, useSelector} from "react-redux";
import {validateLogin, validateRegister} from "../../utils/validation";
import { toast } from "react-toastify";
import { path } from "../../utils/constant";

const {IoPersonCircle,IoCheckmarkCircle} = icons

const Login = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const {isLoggedIn, isRegistered, msg, update, user_role } =useSelector(state=>state.auth) // .auth do define trong rootReducer 
    const [payload,setPayLoad] = useState({
        phone:'',
        password:'',
        email:'',
        username:'',
        confirmPassword:''
    })
    const [isRegister,setIsRegister]= useState(location.state?.flag) //?: state có giá trị mới trỏ đến flag
    const [invalidFields, setInvalidFields] = useState([]); // lưu lỗi

    //reset lại giá trị của payload và invalidFields khi isRegister thay đổi
    useEffect(() => {
        setPayLoad({
            phone: '',
            password: '',
            email: '',
            username: '',
            confirmPassword: ''
        });
        setInvalidFields([]); // Reset lỗi nữa cho sạch
    }, [isRegister]);

    useEffect(() => {
        // Cập nhật giá trị của isRegister bằng flag từ location.state (nếu có)
        setIsRegister(location.state?.flag);
        
    }, [location.state?.flag]); // Chạy lại khi location.state?.flag thay đổi

    useEffect(() => {
        if (isLoggedIn) {
            toast.success("Đăng nhập thành công!");
            setTimeout(() => {
                if(user_role==='admin') navigate(`${path.ADMIN}/${path.DASHBOARD}`, { replace: true })
                else{
                    const redirectPath = location.state?.redirectTo || '/';
                    navigate(redirectPath, { replace: true });
                }
            }, 800);
        }
    }, [isLoggedIn, isRegister, navigate, location.state, user_role]); // Kiểm tra thay đổi của cả isLoggedIn và isRegister
    
    useEffect(() => {
        if(isRegistered) {
            toast.success("Đăng ký thành công!");
            setTimeout(() => {
                dispatch(actions.resetRegisterStatus()); // Reset isRegistered
                setIsRegister(false) 
                // Đặt lại location.state để đảm bảo đồng bộ
                navigate(path.LOGIN, { state: { flag: false }, replace: true });
            }, 800);
        }
    }, [isRegistered,navigate,dispatch]); // Kiểm tra thay đổi của isRegistered
    
    //Lấy thông báo từ redux
    useEffect(()=>{
        msg && toast.error(msg)
     },[msg,update])

    const handleSubmit = async () => {
        setInvalidFields([]);
        // validate dữ liệu
        const errors = isRegister ? validateRegister(payload) : validateLogin(payload);
        setInvalidFields(errors);
        if (errors.length > 0) return;

        const { confirmPassword, ...data } = payload;
        let finalPayload = {};
    
        if (isRegister) {
            finalPayload = data; // Gửi hết thông tin khi đăng ký
        } else {
            // Kiểm tra người dùng nhập email hay phone để gửi đúng key
            const isEmail = payload.email.includes('@');
    
            finalPayload = {
                password: payload.password,
                ...(isEmail ? { email: payload.email } : { phone: payload.email })
            };
        }
        console.log(data);
        await dispatch(isRegister ? actions.register(payload) : actions.login(finalPayload));
    };

    // Hàm xử lý khi nhấn Enter để submit form
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) handleSubmit();
    };

    return(
        <div className="w-full flex items-center justify-center my-3">
            <div className="w-full bg-white max-w-500 p-[30px] pb-[70px] rounded-md shadow-md ">
               <div className="flex flex-col items-center mb-4"> 
                    <div>
                        {isRegister? <IoCheckmarkCircle className="text-orange-500 text-5xl" />: <IoPersonCircle className="text-orange-500 text-5xl" />}
                    </div>
                    <h3 className="font-semibold text-2xl mb-3 text-center">
                        {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    </h3>
                </div>
                <div className="w-full flex flex-col gap-6">
                {isRegister ? (
                    <>
                    <InputForm label="Tên tài khoản" value={payload.username} setValue={setPayLoad} keyPayload={'username'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} onKeyDown={handleKeyDown}/>
                    <InputForm label="Số điện thoại" value={payload.phone} setValue={setPayLoad} keyPayload={'phone'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} onKeyDown={handleKeyDown}/>
                    <InputForm label="Email" type='email' value={payload.email} setValue={setPayLoad} keyPayload={'email'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} onKeyDown={handleKeyDown}/>
                    <InputForm label="Mật khẩu" type='password' value={payload.password} setValue={setPayLoad} keyPayload={'password'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} onKeyDown={handleKeyDown}/>
                    <InputForm label="Nhập lại mật khẩu" type='password' value={payload.confirmPassword} setValue={setPayLoad} keyPayload={'confirmPassword'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} onKeyDown={handleKeyDown}/>
                    </>
                ) : (
                    <>
                        <InputForm label="Số điện thoại hoặc Email" value={payload.email} setValue={setPayLoad} keyPayload={'email'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} onKeyDown={handleKeyDown}/>
                        <InputForm label="Mật khẩu" type='password' value={payload.password} setValue={setPayLoad} keyPayload={'password'} invalidFields={invalidFields} setInvalidFields={setInvalidFields} onKeyDown={handleKeyDown}/>
                    </>
                )}
                    
                    <Button 
                        text={isRegister ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'} 
                        textColor='text-white' 
                        bgColor='bg-red-500' 
                        hover='hover:bg-red-700' 
                        fullWidth={true} 
                        outline='outline-none'
                        onClick={handleSubmit}
                    />
                </div>
                <div className="mt-7 flex items-center justify-between">
                    {isRegister 
                    ? 
                    <small>Bạn đã có tài khoản? <span onClick={()=>setIsRegister(false)} className="text-[blue] hover:text-[red] cursor-pointer">Đăng nhập ngay</span></small>
                    : 
                    <>
                            <small className="text-blue font-bold hover:text-[red] cursor-pointer" >Bạn quên mật khẩu?</small>
                            <div>
                                <small className="text-black font-bold">Bạn chưa có tài khoản? </small>
                                <small className="text-[blue] hover:text-[red] cursor-pointer" onClick={()=>setIsRegister(true)}>Tạo tài khoản mới</small>
                            </div>
                    </>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Login;