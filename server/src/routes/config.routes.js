import express from "express";
import * as configController from '../controllers/config.controller.js';

const router = express.Router();

/**
 * @swagger
 * /configs:
 *   get:
 *     summary: Retrieve VIP price increment configuration
 *     tags: [Configs]
 *     responses:
 *       200:
 *         description: VIP price increment configuration retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vipPriceIncrement:
 *                   type: number
 *                   description: VIP price increment value
 *       500:
 *         description: Server error
 */
router.get('/', configController.getVipPriceIncrementController);

export default router;