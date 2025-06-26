import * as authService from '../services/auth'

export const register = async (req,res)=>{
    const {username, phone, password, email, user_role} = req.body
    try{
        if (!username || !phone || !password || !email) {
            return res.status(400).json({
                err:1,
                msg:"Missing input!"
            })
        }
            
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)

    }catch(error){
        return res.status(500).json({
            err:-1,
            msg:'Failed at auth controller: '+ error
        })
    }
}

export const login = async (req,res)=>{
    const {phone,email,password} = req.body
    try{
        if ((!phone && !email) || !password){
            return res.status(400).json({
                err:1,
                msg:"Missing input!"
            })
        }
            
        const response = await authService.loginService(req.body)
        return res.status(200).json(response)

    }catch(error){
        return res.status(500).json({
            err:-1,
            msg:'Failed at auth controller: '+ error
        })
    }
}

//lỗi âm : lỗi server , dương: lỗi client