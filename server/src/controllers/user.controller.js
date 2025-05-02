import * as services from '../services/user'

export const getUserInfo = async (req, res) => {
    const { user_id } = req.user
    try {
        const response = await services.getOne(user_id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller 1: ' + error
        })
    }
}

export const updateUserInfo = async (req, res) => {
    const { user_id } = req.user
    const { username, email, phone } = req.body 
    try {
        const response = await services.updateUserService(user_id,req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller 2: ' + error
        })
    }
}

export const changePassword = async(req,res)=>{
    const { user_id } = req.user
    const data = req.body
    try {
        const response = await services.changePasswordService(user_id,data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller 3: ' + error
        })
    }
}