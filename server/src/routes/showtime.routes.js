import express from 'express';
import * as showtimeController from '../controllers/showtime.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';

const router = express.Router();

/**
 * @swagger
 * /showtimes/{movie_id}:
 *   post:
 *     summary: Create a new showtime
 *     tags: [Showtimes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showtime_date:
 *                 type: string
 *                 format: date
 *               showtime_starttime:
 *                 type: string
 *               showtime_endtime:
 *                 type: string
 *               price:
 *                 type: number
 *               cinema_id:
 *                 type: string
 *             required:
 *               - showtime_date
 *               - price
 *               - cinema_id
 *     responses:
 *       200:
 *         description: Showtime created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       400:
 *         description: Missing required fields or time conflict
 *       401:
 *         description: Unauthorized (requires admin role)
 *       500:
 *         description: Server error
 */
router.post('/:movie_id', verifyToken, isAdmin, showtimeController.createShowtime);

/**
 * @swagger
 * /showtimes:
 *   get:
 *     summary: Retrieve showtimes by movie or cluster	
 *     tags: [Showtimes]
 *     parameters:
 *       - in: query
 *         name: cluster_id
 *         schema:
 *           type: string
 *         description: ID of the cinema cluster
 *       - in: query
 *         name: movie_id
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       200:
 *         description: List of showtimes retrieved successfully
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
 *                     movies:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Movie'
 *                     showtimesByDate:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date
 *                           showtimes:
 *                             type: array
 *                             items:
 *                               $ref: '#/components/schemas/Showtime'
 *       500:
 *         description: Server error
 */
router.get('/', showtimeController.getShowtimesByQueryController);

/**
 * @swagger
 * /showtimes/{showtime_id}:
 *   get:
 *     summary: Retrieve showtime details by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: showtime_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the showtime
 *     responses:
 *       200:
 *         description: Showtime details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */
router.get('/:showtime_id', showtimeController.getShowtimeDetailController);

/**
 * @swagger
 * /showtimes/{showtime_id}:
 *   delete:
 *     summary: Delete a specific showtime	
 *     tags: [Showtimes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: showtime_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the showtime
 *     responses:
 *       200:
 *         description: Showtime deleted successfully
 *       400:
 *         description: Cannot delete due to booked tickets or time restrictions
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */
router.delete('/:showtime_id', verifyToken, isAdmin, showtimeController.deleteShowtimeController);

/**
 * @swagger
 * /showtimes:
 *   delete:
 *     summary: Auto delete outdated showtimes	
 *     tags: [Showtimes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Outdated showtimes deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                 msg:
 *                   type: string
 *       401:
 *         description: Unauthorized (requires admin role)
 *       500:
 *         description: Server error
 */
router.delete('/', showtimeController.autoDeleteShowtimeController);

/**
 * @swagger
 * /showtimes/{showtime_id}:
 *   put:
 *     summary: Update a specific showtime	
 *     tags: [Showtimes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: showtime_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the showtime
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showtime_date:
 *                 type: string
 *                 format: date
 *               showtime_starttime:
 *                 type: string
 *               showtime_endtime:
 *                 type: string
 *               price:
 *                 type: number
 *               movie_id:
 *                 type: string
 *               cinema_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Showtime updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       400:
 *         description: Validation error or time conflict
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */
router.put('/:showtime_id', verifyToken, isAdmin, showtimeController.updateShowtimeController);

export default router;
