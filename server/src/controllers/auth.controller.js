import * as authService from '../services/auth'

export const register = async (req,res)=>{
    const {username,phone,password,email} = req.body
    try{
        if (!username || !phone || !password || !email) {
            return res.status(400).json({
                err:1,
                msg:"Missing input!"
            })
        }
            
        const respone = await authService.registerService(req.body)
        return res.status(200).json(respone)

    }catch(error){
        return res.status(500).json({
            err:-1,
            msg:'Failed at auth controller: '+ error
        })
    }
}