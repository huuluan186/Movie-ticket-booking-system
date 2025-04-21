import * as services from '../services/user'

export const getUserInfo = async (req, res) => {
    const { user_id } = req.user
    try {
        const response = await services.getOne(user_id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}