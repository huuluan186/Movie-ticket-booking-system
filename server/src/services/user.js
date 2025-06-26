import db from '../models'
import { Op } from 'sequelize'
import bcrypt from 'bcryptjs'

// GET CURRENT
export const getOne = (user_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { user_id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get current user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

//Update user
export const updateUserService = (user_id, {username, email, phone}) => new Promise(async (resolve, reject) => {
    try {
        // Log dữ liệu đầu vào
        console.log('Input data:', { username, email, phone });
        // Trim các trường đầu vào
        const trimmedData = {
            username: username?.trim() || '',
            email: email?.trim() || '',
            phone: phone?.trim() || ''
        };
         // Log dữ liệu sau khi trim
         console.log('Trimmed data:', trimmedData);
        // Tìm user theo user_id
        const user = await db.User.findOne({ where: { user_id }, raw: true });
        if (!user) {
            console.log('User not found for user_id:', user_id);
            return resolve({
            err: 1,
            msg: 'Người dùng không tồn tại!',
            response: null,
            });
        }
  
        // Chuẩn bị dữ liệu cập nhật (chỉ lấy các trường được gửi)
        const updateData = {};
        // Kiểm tra và xử lý từng trường
        if (trimmedData.username !== user.username) {
            if (trimmedData.username === '') {
                console.log('Username is empty');
                return resolve({
                    err: 1,
                    msg: 'Tên tài khoản không được để trống!',
                    response: null,
                });
            }
            updateData.username = trimmedData.username;
        }

        if (trimmedData.email !== user.email) {
            if (trimmedData.email === '') {
                console.log('Email is empty');
                return resolve({
                    err: 1,
                    msg: 'Email không được để trống!',
                    response: null,
                });
            }
            updateData.email = trimmedData.email;
        }

        if (trimmedData.phone !== user.phone) {
            if (trimmedData.phone === '') {
                console.log('Phone is empty');
                return resolve({
                    err: 1,
                    msg: 'Số điện thoại không được để trống!',
                    response: null,
                });
            }
            updateData.phone = trimmedData.phone;
        }
         // Log dữ liệu sẽ cập nhật
         console.log('Update data:', updateData);
       // Kiểm tra trùng lặp từng trường
        if (Object.keys(updateData).length > 0) {
            const conditions = [];
            if (trimmedData.email) conditions.push({ email: trimmedData.email });
            if (trimmedData.phone) conditions.push({ phone: trimmedData.phone });
            if (trimmedData.username) conditions.push({ username: trimmedData.username });
            console.log('Duplicate check conditions:', conditions);
            if (conditions.length > 0) {
                const existingUser = await db.User.findOne({
                where: {
                    [Op.or]: conditions,
                    user_id: { [Op.ne]: user_id }, // Loại trừ user hiện tại
                },
                raw: true,
                });
    
                if (existingUser) {
                    let field;
                    if (existingUser.username === trimmedData.username) field = 'Tên tài khoản';
                    else if (existingUser.email === trimmedData.email) field = 'Email';
                    else if(existingUser.phone === trimmedData.phone) field = 'Số điện thoại';     
                    console.log('Existing user:', existingUser);
                    console.log('Duplicate field:', field);      
                    
                    if (field) {
                        return resolve({
                            err: 1,
                            msg: `${field} đã tồn tại!`,
                            response: user,
                        });
                    }
                }
            }    
            // Cập nhật thông tin (chỉ các trường được gửi)
            console.log('Updating user with data:', updateData);
            // Cập nhật thông tin (chỉ các trường được gửi)
            await db.User.update(updateData, { where: { user_id } });
        }
  
        // // Lấy lại thông tin user sau khi cập nhật
        // let updatedUser;
        // if (Object.keys(updateData).length > 0) {
        //     updatedUser = await db.User.findOne({
        //         where: { user_id },
        //         raw: true,
        //         attributes: { exclude: ['password'] },
        //     });
        // } else {
        //     // Loại bỏ password từ user cũ
        //     updatedUser = { ...user };
        //     delete updatedUser.password;
        // }
  
        resolve({
            err: 0,
            msg: Object.keys(updateData).length > 0 ? 'Cập nhật thông tin thành công!' : 'Thông tin được giữ nguyên!',
            //response: updatedUser,
        });
    } catch (error) {
        console.error('Error in updateUserService:', error);
      reject(error);
    }
  });


const hashPassword= password => bcrypt.hashSync(password,bcrypt.genSaltSync(12));

//change password
export const changePasswordService = (user_id, data) => new Promise(async (resolve, reject) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = data;

        //Kiểm tra input
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return resolve({
              err: 1,
              msg: 'Vui lòng nhập đầy đủ thông tin.',
              response: null,
            });
          }

          if (newPassword !== confirmNewPassword) {
            return resolve({
              err: 1,
              msg: 'Mật khẩu mới và xác nhận mật khẩu không khớp.',
              response: null,
            });
          }

        const user = await db.User.findOne({
            where: {user_id},
            raw:true
        });
        if(!user) return resolve({err:1,msg:'Không tìm thấy người dùng',response:null})
        
        // Kiểm tra mật khẩu cũ
        const isMatch = bcrypt.compareSync(currentPassword, user.password);
        if (!isMatch) {
            return resolve({
            err: 1,
            msg: 'Mật khẩu hiện tại không đúng.',
            response: null,
            });
        }
        // Cập nhật mật khẩu
        await db.User.update(
            { password: hashPassword(newPassword) },
            { where: { user_id } }
        );

        resolve({
            err: 0,
            msg: 'Đổi mật khẩu thành công.',
          });

    } catch (error) {
        reject(error);
    }
})

export const getAllUsersService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAndCountAll({
            raw: true,
            nested:true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get all users.',
            response
        })
    } catch (error) {
        reject(error)
    }
})