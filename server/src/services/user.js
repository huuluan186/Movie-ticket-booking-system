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
export const updateUserService = (user_id, data) => new Promise(async (resolve, reject) => {
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
        if (data.username) updateData.username = data.username.trim();
        if (data.email) updateData.email = data.email.trim();
        if (data.phone) updateData.phone = data.phone.trim();
  
       // Kiểm tra trùng từng trường
        if (data.email || data.phone || data.username) {
            const conditions = [];
            if (data.email) conditions.push({ email: data.email });
            if (data.phone) conditions.push({ phone: data.phone });
            if (data.username) conditions.push({ username: data.username });
        
            const existingUser = await db.User.findOne({
            where: {
                [Op.or]: conditions,
                user_id: { [Op.ne]: user_id }, // Loại trừ user hiện tại
            },
            raw: true,
            });
  
            if (existingUser) {
                let field;
                if (existingUser.username === data.username) field = 'Tên tài khoản';
                else if (existingUser.email === data.email) field = 'Email';
                else field = 'Số điện thoại';            
                return resolve({
                err: 1,
                msg: `${field} đã được sử dụng bởi người dùng khác!`,
                response: null,
            });
            }
        }
  
        // Cập nhật thông tin (chỉ các trường được gửi)
        await db.User.update(updateData, { where: { user_id } });
    
        // Lấy lại thông tin user sau khi cập nhật
        const updatedUser = await db.User.findOne({
            where: { user_id },
            raw: true,
            attributes: { exclude: ['password'] },
        });
  
        resolve({
            err: 0,
            msg: 'Cập nhật thông tin thành công!',
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