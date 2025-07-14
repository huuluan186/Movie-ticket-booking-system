import express from "express";
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
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
 *                 default: 'user'
 *                 description: User's role (defaults to 'user' if not specified)
 *             required: ['phone', 'password', 'username', 'email']
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                   description: Error code (0 for success)
 *                 msg:
 *                   type: string
 *                   description: Response message
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Missing required fields or duplicate phone/email/username
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
 *       500:
 *         description: Server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number (optional if email provided)
 *               email:
 *                 type: string
 *                 description: User's email (optional if phone provided)
 *               password:
 *                 type: string
 *                 description: User's password
 *             required: ['password']
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                   description: Error code (0 for success)
 *                 msg:
 *                   type: string
 *                   description: Response message
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Missing required fields or invalid credentials
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
 *       500:
 *         description: Server error
 */
router.post('/login', authController.login);

export default router;