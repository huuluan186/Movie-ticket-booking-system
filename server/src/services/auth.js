import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'
import { Op } from 'sequelize';
require('dotenv').config()


if (!process.env.SECRET_KEY) {
    console.error('❌ Missing SECRET_KEY in .env');
    process.exit(1);
}
//hàm băm mật khẩu
const hashPassword= password => bcrypt.hashSync(password,bcrypt.genSaltSync(12))

export const registerService = ({phone,password,username,email})=> new Promise(async(resolve,reject)=>{
    try {
        const response = await db.User.findOrCreate({
            where: {
                [Op.or]: [
                    { phone },
                    { email }
                ]
            },
            defaults:{
                phone,
                username,
                email,
                password: hashPassword(password),
                user_id: v4()
            }
        })
        const token = response[1] && jwt.sign({user_id:response[0].user_id,phone:response[0].phone,email:response[0].email},process.env.SECRET_KEY,{expiresIn:'2d'})
        resolve({
            err:token ? 0 : 2,
            msg: token ? 'Register is successfully !' : 'Phone number or email has been already used !',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})