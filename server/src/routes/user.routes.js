import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';
import * as userController from '../controllers/user.controller.js';
import * as orderController from '../controllers/order.controller.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 response:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                     rows:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (requires admin role)
 *       500:
 *         description: Server error
 */
router.get('/', verifyToken, isAdmin, userController.getAllUsersController);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/me', verifyToken, userController.getUserInfo);

/**
 * @swagger
 * /users/me/profile:
 *   put:
 *     summary: Update your own profile information.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username
 *               email:
 *                 type: string
 *                 description: New email
 *               phone:
 *                 type: string
 *                 description: New phone number
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error or duplicate username/email/phone
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/me/profile', verifyToken, userController.updateUserInfo);

/**
 * @swagger
 * /users/me/password:
 *   put:
 *     summary: Change your own password.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Current password
 *               newPassword:
 *                 type: string
 *                 description: New password
 *               confirmNewPassword:
 *                 type: string
 *                 description: Confirm new password
 *             required: ['currentPassword', 'newPassword', 'confirmNewPassword']
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid current password or mismatched new passwords
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/me/password', verifyToken, userController.changePassword);

/**
 * @swagger
 * /users/me/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showtime_id:
 *                 type: string
 *                 description: ID of the showtime
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     seatId:
 *                       type: string
 *                 description: List of seat IDs to book
 *               total_amount:
 *                 type: number
 *                 description: Total order amount
 *             required: ['showtime_id', 'seats', 'total_amount']
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 order_id:
 *                   type: string
 *                 tickets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ticket_id:
 *                         type: string
 *                       seat_id:
 *                         type: string
 *                       price:
 *                         type: number
 *                       showtime_id:
 *                         type: string
 *       400:
 *         description: Validation error or seats already booked
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/me/orders', verifyToken, orderController.createOrderController);

/**
 * @swagger
 * /users/me/orders:
 *   get:
 *     summary: Retrieve your order history
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Order history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: string
 *                       order_date:
 *                         type: string
 *                         format: date-time
 *                       total_amount:
 *                         type: number
 *                       movie_title:
 *                         type: string
 *                       cinema_name:
 *                         type: string
 *                       cluster_name:
 *                         type: string
 *                       chain_name:
 *                         type: string
 *                       address:
 *                         type: string
 *                       showtime_date:
 *                         type: string
 *                         format: date
 *                       showtime_starttime:
 *                         type: string
 *                       showtime_endtime:
 *                         type: string
 *                       seats:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             row:
 *                               type: integer
 *                             column:
 *                               type: integer
 *                             price:
 *                               type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/me/orders', verifyToken, orderController.getOrderHistoryController);

/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: Update user by admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username
 *               email:
 *                 type: string
 *                 description: New email
 *               phone:
 *                 type: string
 *                 description: New phone number
 *               user_role:
 *                 type: string
 *                 enum: ['admin', 'user']
 *                 description: New user role
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Validation error or duplicate username/email/phone
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:user_id', verifyToken, isAdmin, userController.adminUpdateUserController);

/**
 * @swagger
 * /users/{user_id}/password:
 *   put:
 *     summary: Change user password by admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password
 *             required: ['newPassword']
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:user_id/password', verifyToken, isAdmin, userController.adminChangePasswordController);

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: Delete user by admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Cannot delete self or another admin
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:user_id', verifyToken, isAdmin, userController.deleteUserController);

/**
 * @swagger
 * /users/roles:
 *   get:
 *     summary: Retrieve user roles
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       englishValue:
 *                         type: string
 *                       vietnameseValue:
 *                         type: string
 *       401:
 *         description: Unauthorized (requires admin role)
 *       500:
 *         description: Server error
 */
router.get('/roles', verifyToken, isAdmin, userController.getUserRoleListController);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 description: User's password
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 description: User's email
 *               user_role:
 *                 type: string
 *                 enum: ['admin', 'user']
 *                 description: User's role
 *             required: ['phone', 'password', 'username', 'email']
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                 msg:
 *                   type: string
 *       400:
 *         description: Missing required fields or duplicate username/email/phone
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                   description: Error code (1 for client error)
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       401:
 *         description: Unauthorized (requires admin role)
 *       500:
 *         description: Server error
 */
router.post('/', verifyToken, isAdmin, userController.createUserController);

export default router;