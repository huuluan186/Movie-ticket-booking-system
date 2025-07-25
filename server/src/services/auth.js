import db from '../models/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'

if (!process.env.SECRET_KEY) {
    console.error('❌ Missing SECRET_KEY in .env');
    process.exit(1);
}

//hàm băm mật khẩu
const hashPassword= password => bcrypt.hashSync(password,bcrypt.genSaltSync(12))

export const registerService = ({ phone, password, username, email, user_role}, isSelfRegister = true) => new Promise(async (resolve, reject) => {
    try {
         // Kiểm tra trùng từng trường
        const [userByPhone, userByEmail, userByUsername] = await Promise.all([
            db.User.findOne({ where: { phone } }),
            db.User.findOne({ where: { email } }),
            db.User.findOne({ where: { username } }),
        ]);

        if (userByPhone) return resolve({ err: 1, msg: 'Số điện thoại đã được sử dụng!', token: null });
        if (userByEmail) return resolve({ err: 1, msg: 'Email đã được sử dụng!', token: null });
        if (userByUsername) return resolve({ err: 1, msg: 'Tên người dùng đã tồn tại!', token: null });


        // Nếu không trùng, tạo mới
        const response = await db.User.create({
            user_id: v4(),
            phone,
            username,
            email,
            password: hashPassword(password),
            user_role
        });

        if (isSelfRegister) {
            const token = jwt.sign(
                {
                    user_id: response.user_id,
                    phone: response.phone,
                    email: response.email,
                    role: response.user_role
                }, process.env.SECRET_KEY, { expiresIn: '2d' }
            );
            return resolve({ err: 0, msg: 'Đăng ký thành công!', token });
        }

        return resolve({ err: 0, msg: 'Tạo tài khoản thành công!', token: null });

    } catch (error) {
        reject(error);
    }
});


export const loginService = ({ phone, email, password }) => new Promise(async (resolve, reject) => {
    try {
        const key = phone ? { phone } : email ? { email } : null;
        if (!key) return resolve({ err: 1, msg: 'Vui lòng nhập số điện thoại hoặc email!', token: null });

        const response = await db.User.findOne({ where: key, raw: true });
        if (!response) {
            const field = phone ? 'Số điện thoại' : 'Email';
            return resolve({ err: 1, msg: `${field} không tồn tại!`, token: null });
        }

        const isCorrectPassword = bcrypt.compareSync(password, response.password);
        if (!isCorrectPassword) return resolve({ err: 2, msg: 'Mật khẩu không đúng!', token: null });

        const token = jwt.sign(
            { 
                user_id: response.user_id, 
                phone: response.phone, 
                email: response.email, 
                role: response.user_role
            },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        );
        resolve({ err: 0, msg: 'Đăng nhập thành công!', token });
    } catch (error) {
        reject(error);
    }
});
