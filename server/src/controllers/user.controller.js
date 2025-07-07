import * as services from '../services/user'
import * as authService from '../services/auth'

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

export const getAllUsersController = async (req, res) => {
    try {
        const response = await services.getAllUsersService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller 4: ' + error
        })
    }
}

export const createUserController = async (req,res)=>{
    const {username, phone, password, email, user_role} = req.body
    try{
        if (!username || !phone || !password || !email) {
            return res.status(400).json({
                err:1,
                msg:"Missing input!"
            })
        }
            
        const response = await authService.registerService(req.body, false)
        return res.status(200).json(response)

    }catch(error){
        return res.status(500).json({
            err:-1,
            msg:'Failed at createUserController controller: '+ error
        })
    }
}

export const adminUpdateUserController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const response = await services.adminUpdateUserService(user_id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at admin update user info controller:' + error});
    }
};

export const adminChangePasswordController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const response = await services.adminChangePasswordService(user_id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at admin change password controller:' + error});
    }
};

export const deleteUserController = async (req, res) => {
  try {
        const { user_id } = req.params;
        const admin = req.user; // từ verifyToken

        const response = await services.deleteUserService(admin, user_id);
        return res.status(200).json(response);
  } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at deleteUser controller: ' + error,
        });
  }
};

export const getUserRoleListController = async (req, res) => {
    try {
        const response = await services.getUserRolesListService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at getUserRoleList controller: ' + error,
        });
    }
}