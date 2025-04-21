import db from '../models'

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