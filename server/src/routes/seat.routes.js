import express from 'express';
import * as seatController from '../controllers/seat.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

/**
 * @swagger
 * /seats/{cinema_id}:
 *   post:
 *     summary: Create seats for a specific cinema
 *     tags: [Seats]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cinema_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema
 *     responses:
 *       200:
 *         description: Seats created successfully
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
 *         description: Cinema already has seats or invalid cinema ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/:cinema_id', verifyToken, seatController.createSeatsForCinemaController);

/**
 * @swagger
 * /seats:
 *   get:
 *     summary: Retrieve seat layout for a specific cinema and showtime
 *     tags: [Seats]
 *     parameters:
 *       - in: query
 *         name: cinema_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema
 *       - in: query
 *         name: showtime_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the showtime
 *     responses:
 *       200:
 *         description: Seat layout retrieved successfully
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
 *                     cinemaId:
 *                       type: string
 *                     seat_layout:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           row:
 *                             type: integer
 *                           seats:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 seatId:
 *                                   type: string
 *                                 row:
 *                                   type: integer
 *                                 column:
 *                                   type: integer
 *                                 type:
 *                                   type: string
 *                                   enum: ['VIP', 'Normal']
 *                                 booked:
 *                                   type: boolean
 *       400:
 *         description: Invalid or missing cinema_id or showtime_id
 *       500:
 *         description: Server error
 */
router.get('/', seatController.getCinemaSeatLayoutController);

export default router;