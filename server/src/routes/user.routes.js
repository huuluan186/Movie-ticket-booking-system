import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';
import * as userController from '../controllers/user.controller.js';
import * as orderController from '../controllers/order.controller.js';

const router = express.Router()

router.get('/', verifyToken, isAdmin, userController.getAllUsersController)
router.get('/me', verifyToken, userController.getUserInfo)
router.put('/me/profile', verifyToken, userController.updateUserInfo)
router.put('/me/password', verifyToken, userController.changePassword)
router.post('/me/orders', verifyToken, orderController.createOrderController);
router.get('/me/orders', verifyToken, orderController.getOrderHistoryController) 
router.put('/:user_id', verifyToken, isAdmin, userController.adminUpdateUserController)
router.put('/:user_id/password', verifyToken, isAdmin, userController.adminChangePasswordController);
router.delete('/:user_id', verifyToken, isAdmin, userController.deleteUserController);
router.get('/roles', verifyToken, isAdmin, userController.getUserRoleListController)
// Admin tạo user mới => cần token và phải là admin => không trả token
router.post('/', verifyToken, isAdmin, userController.createUserController);

export default router