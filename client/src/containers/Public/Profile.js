import React  , {useState, useEffect} from 'react';
import { Button } from '../../components';
import { validateFields } from "../../utils/validation"; 
import * as actions from '../../store/actions'
import { useDispatch, useSelector} from "react-redux";

const Profile = () => {
    //const dispatch = useDispatch();
    //const {isLoggedIn,msg,update} =useSelector(state=>state.auth)
    const { currentData } = useSelector((state) => state.user);
    const [isUpdateInfo, setIsUpdateInfo] = useState(false)
    //const [invalidFields, setInvalidFields] = useState([]);

    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        user_role: '',
      });

    useEffect(() => {
        if (currentData) {
          setFormData({
            username: currentData.username,
            phone: currentData.phone,
            email: currentData.email,
            user_role: currentData.user_role,
          });
        }
      }, [currentData]);

    const handleClickUpdateInfoButton = () => {
        setIsUpdateInfo((prevState) => !prevState);
        setInvalidFields([]); //clear validate error khi nhấn vào
    };

    const handleConfirmUpdateData = ()=> {
        setIsUpdateInfo(false);
        alert("update thành công!")
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

   
    return (
        <div className="w-full m-auto max-w-md py-10">
            <div className='text-center'>
                <h1 className="text-orange-700 text-3xl font-bold text-center mb-6 inline-block mx-auto">
                THÔNG TIN CÁ NHÂN
                    <div className="relative w-full h-0.5 bg-black mt-3">
                        <div className="absolute inset-0 w-20 h-1.5 bg-orange-400 m-auto z-10"></div>
                    </div>
                </h1>
            </div>

            { isUpdateInfo ?
            <div className='space-y-4'>
                <div className='group'>
                    <label className="text-sm text-gray-500 group-focus-within:text-blue-700 group-focus-within:font-medium">Họ và tên</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full pb-1 bg-transparent border-b border-blue-500 focus:outline-none "
                    />
                </div> 
                <div className='group'>
                    <label className="text-sm text-gray-500 group-focus-within:text-blue-700 group-focus-within:font-medium">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pb-1 bg-transparent border-b border-blue-500 focus:outline-none"
                    />
                </div>
                <div className='group'>
                    <label className="text-sm text-gray-500 group-focus-within:text-blue-700 group-focus-within:font-medium">Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pb-1 bg-transparent border-b border-blue-500 focus:outline-none"
                    />
                </div>
            </div>
            :
                <div>
                    <div className="space-y-4">
                        <div className='flex items-center justify-between border-b border-blue-500'>
                            <p className="text-black text-md font-semibold">Họ và tên: </p>
                            <p className=" p-1 bg-transparent text-black focus:outline-none"> {formData.username} </p>
                        </div>
                        <div className='flex items-center justify-between border-b border-blue-500'>
                            <p className="text-black text-md font-semibold">Email: </p>
                            <p className=" p-1 bg-transparent text-black focus:outline-none"> {formData.email} </p>
                        </div>
                        <div className='flex items-center justify-between border-b border-blue-500'>
                            <p className="text-black text-md font-semibold">Số điện thoại: </p>
                            <p className=" p-1 bg-transparent text-black focus:outline-none"> {formData.phone} </p>
                        </div>
                        <div className='flex items-center justify-between border-b border-blue-500'>
                            <p className="text-black text-md font-semibold">Loại tài khoản: </p>
                            <p className=" p-1 bg-transparent text-black focus:outline-none"> {formData.user_role} </p>
                        </div>
                    </div>
                </div>
            }
            <div className="flex justify-center items-center gap-4 mt-8">
            {isUpdateInfo &&
                <Button
                    text="HỦY"
                    bgColor="bg-red-400"
                    textColor="text-black"
                    hover="hover:bg-red-600"
                    onClick={handleClickUpdateInfoButton}
                />
            }
                <Button
                    text={isUpdateInfo ? "CẬP NHẬT" : "CẬP NHẬT THÔNG TIN"}
                    bgColor="bg-green-400"
                    textColor="text-black"
                    hover="hover:bg-green-600"
                    onClick={isUpdateInfo ? handleConfirmUpdateData : handleClickUpdateInfoButton}
                />
            </div>
        </div>
    );
};

export default Profile;