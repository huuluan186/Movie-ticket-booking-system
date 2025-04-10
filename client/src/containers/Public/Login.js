import React, {useState,useEffect}  from "react";
import { useLocation } from "react-router-dom";
import {Button,InputForm} from '../../components'
import icons from "../../utils/icon";
import * as actions from '../../store/actions'
import { useDispatch } from "react-redux";

const {IoPersonCircle,IoCheckmarkCircle} = icons

const Login = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [isRegister,setIsRegister]= useState(location.state?.flag) //?: state có giá trị mới trỏ đến flag

    useEffect(() => {
        // Cập nhật giá trị của isRegister bằng flag từ location.state (nếu có)
        setIsRegister(location.state?.flag);
    }, [location.state?.flag]); // Chạy lại khi location.state?.flag thay đổi

    const [payload,setPayLoad] = useState({
        phone:'',
        password:'',
        email:'',
        username:''
    })

    const handleSubmit = async ()=>{
        try {
            console.log(payload);
            await dispatch(actions.register(payload));
        } catch (error) {
            console.error("Đăng ký thất bại:", error);
        }
    }

    return(
        <div className="w-full flex items-center justify-center">
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
                    <InputForm label="Tên tài khoản" value={payload.username} setValue={setPayLoad} keyPayload={'username'} />
                    <InputForm label="Số điện thoại" value={payload.phone} setValue={setPayLoad} keyPayload={'phone'}/>
                    <InputForm label="Email" type='email' value={payload.email} setValue={setPayLoad} keyPayload={'email'} />
                    </>
                ) : (
                    <InputForm label="Số điện thoại hoặc Email" value={payload.email} setValue={setPayLoad} keyPayload={'email'}/>
                )}
                    <InputForm label="Mật khẩu" type='password' value={payload.password} setValue={setPayLoad} keyPayload={'password'}/>
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