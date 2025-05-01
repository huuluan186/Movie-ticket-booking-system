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
        // Tìm user theo user_id
        const user = await db.User.findOne({ where: { user_id }, raw: true });
        if (!user) {
            return resolve({
            err: 1,
            msg: 'Người dùng không tồn tại!',
            response: null,
            });
        }
  
        // Chuẩn bị dữ liệu cập nhật (chỉ lấy các trường được gửi)
        const updateData = {};
        // Kiểm tra và xử lý từng trường
        if (username !== user.username) {
            if (username === '') {
                return resolve({
                    err: 1,
                    msg: 'Tên tài khoản không được để trống!',
                    response: null,
                });
            }
            updateData.username = username;
        }

        if (email !== user.email) {
            if (email === '') {
                return resolve({
                    err: 1,
                    msg: 'Email không được để trống!',
                    response: null,
                });
            }
            updateData.email = email;
        }

        if (phone !== user.phone) {
            if (phone === '') {
                return resolve({
                    err: 1,
                    msg: 'Số điện thoại không được để trống!',
                    response: null,
                });
            }
            updateData.phone = phone;
        }
  
       // Kiểm tra trùng lặp từng trường
        if (Object.keys(updateData).length > 0) {
            const conditions = [];
            if (email) conditions.push({ email: email });
            if (phone) conditions.push({ phone: phone });
            if (username) conditions.push({ username: username });
            
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
                    if (existingUser.username === username) field = 'Tên tài khoản';
                    else if (existingUser.email === email) field = 'Email';
                    else field = 'Số điện thoại';            
                    return resolve({
                    err: 1,
                    msg: `${field} đã tồn tại!`,
                    response: null,
                });
                }
            }    

            // Cập nhật thông tin (chỉ các trường được gửi)
            await db.User.update(updateData, { where: { user_id } });
        }
  
        // Lấy lại thông tin user sau khi cập nhật
        let updatedUser;
        if (Object.keys(updateData).length > 0) {
            updatedUser = await db.User.findOne({
                where: { user_id },
                raw: true,
                attributes: { exclude: ['password'] },
            });
        } else {
            // Loại bỏ password từ user cũ
            updatedUser = { ...user };
            delete updatedUser.password;
        }
  
        resolve({
            err: 0,
            msg: Object.keys(updateData).length > 0 ? 'Cập nhật thông tin thành công!' : 'Thông tin được giữ nguyên!',
            response: updatedUser,
        });
    } catch (error) {
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

        // Lấy lại thông tin user sau khi cập nhật
        const updatedUser = await db.User.findOne({
            where: { user_id },
            raw: true,
            attributes: { exclude: ['password'] },
        });

        resolve({
            err: 0,
            msg: 'Đổi mật khẩu thành công.',
            response: updatedUser,
          });

    } catch (error) {
        reject(error);
    }
})