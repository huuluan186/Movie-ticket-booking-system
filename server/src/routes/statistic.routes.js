import express from 'express';
import * as statisticsController from '../controllers/statistic.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';

const router = express.Router();

/**
 * @swagger
 * /statistics/movies:
 *   get:
 *     summary: Retrieve revenue statistics by movie
 *     tags: [Statistics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering
 *       - in: query
 *         name: movie_id
 *         schema:
 *           type: string
 *         description: Filter by movie ID
 *     responses:
 *       200:
 *         description: Revenue data grouped by movie retrieved successfully
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
 *                       movie_id_snapshot:
 *                         type: string
 *                       movie_title_snapshot:
 *                         type: string
 *                       total_tickets:
 *                         type: integer
 *                       total_revenue:
 *                         type: number
 *       401:
 *         description: Unauthorized (requires admin role)
 *       500:
 *         description: Server error
 */
router.get('/movies', verifyToken, isAdmin, statisticsController.getRevenueByMovie);

/**
 * @swagger
 * /statistics/clusters:
 *   get:
 *     summary: Retrieve revenue statistics by cinema cluster
 *     tags: [Statistics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering
 *       - in: query
 *         name: cluster_id
 *         schema:
 *           type: string
 *         description: Filter by cluster ID
 *     responses:
 *       200:
 *         description: Revenue data grouped by cinema cluster retrieved successfully
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
 *                       cluster_id_snapshot:
 *                         type: string
 *                       cluster_name_snapshot:
 *                         type: string
 *                       total_tickets:
 *                         type: integer
 *                       total_revenue:
 *                         type: number
 *       401:
 *         description: Unauthorized (requires admin role)
 *       500:
 *         description: Server error
 */
router.get('/clusters', verifyToken, isAdmin, statisticsController.getRevenueByCluster);

export default router;