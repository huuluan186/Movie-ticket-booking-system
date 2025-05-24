import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as userController from '../controllers/user.controller'

const router = express.Router()

router.get('/',userController.getAllUsersController)
router.use(verifyToken)
router.get('/me', userController.getUserInfo)
router.put('/me/profile',userController.updateUserInfo)
router.put('/me/password', userController.changePassword)
export default router