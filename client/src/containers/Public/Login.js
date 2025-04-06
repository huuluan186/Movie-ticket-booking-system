import React from "react";
import {Button,InputForm} from '../../components'
import icons from "../../utils/icon";

const {IoPersonCircle} = icons
const Login = () => {
    return(
        <div className="w-full flex items-center justify-center">
            <div className="w-full bg-white max-w-500 p-[30px] pb-[100px] rounded-md shadow-sm ">
               <div className="flex flex-col items-center mb-4"> 
                    <div className="">
                        <IoPersonCircle className="text-orange-500 text-5xl" />
                    </div>
                    <h3 className="font-semibold text-2xl mb-3 text-center">
                        Đăng nhập
                    </h3>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <InputForm label={'Số điện thoại'} />
                    <InputForm label={'Mật khẩu'}/>
                    <Button 
                        text={'ĐĂNG NHẬP'} 
                        textColor='text-white' 
                        bgColor='bg-red-500' 
                        hover='hover:bg-red-700' 
                        fullWidth={true} 
                        outline='outline-none'
                    />
                </div>
                <div className="mt-7 flex items-center justify-between">
                    <small className="text-blue font-bold hover:text-[red] cursor-pointer" >Bạn quên mật khẩu?</small>
                    <div>
                        <small className="text-black font-bold">Bạn chưa có tài khoản? </small>
                        <small className="text-[blue] hover:text-[red] cursor-pointer">Tạo tài khoản mới</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;