import express from "express";
import * as cinemaController from '../controllers/cinema.controller.js';
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/userAuthentication.js";

const router = express.Router();

/**
 * @swagger
 * /cinemas:
 *   post:
 *     summary: Create a new cinema
 *     tags: [Cinemas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cinema_name:
 *                 type: string
 *                 description: Name of the cinema
 *               cluster_id:
 *                 type: string
 *                 description: ID of the associated cinema cluster
 *               rowCount:
 *                 type: integer
 *                 description: Number of seat rows
 *               columnCount:
 *                 type: integer
 *                 description: Number of seat columns
 *             required: ['cinema_name', 'cluster_id', 'rowCount', 'columnCount']
 *     responses:
 *       200:
 *         description: Cinema created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cinema'
 *       400:
 *         description: Missing required fields or duplicate cinema name
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
router.post("/", verifyToken, isAdmin, cinemaController.createCinemaController);

/**
 * @swagger
 * /cinemas:
 *   get:
 *     summary: Retrieve all cinemas (optionally filtered by cluster)
 *     tags: [Cinemas]
 *     parameters:
 *       - in: query
 *         name: cluster_id
 *         schema:
 *           type: string
 *         description: Filter by cinema cluster ID
 *     responses:
 *       200:
 *         description:  List of cinemas retrieved successfully
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
 *                         $ref: '#/components/schemas/Cinema'
 *       500:
 *         description: Server error
 */
router.get("/", cinemaController.getAllCinemasController);

/**
 * @swagger
 * /cinemas/{cinema_id}:
 *   get:
 *     summary: Retrieve details of a specific cinema by ID
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: cinema_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema
 *     responses:
 *       200:
 *         description: Cinema details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cinema'
 *       404:
 *         description: Cinema not found
 *       500:
 *         description: Server error
 */
router.get("/:cinema_id", cinemaController.getCinemaByIdController);

/**
 * @swagger
 * /cinemas/{cinema_id}:
 *   put:
 *     summary: Update details of a specific cinema
 *     tags: [Cinemas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cinema_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cinema_name:
 *                 type: string
 *                 description: Name of the cinema
 *               cluster_id:
 *                 type: string
 *                 description: ID of the associated cinema cluster
 *               rowCount:
 *                 type: integer
 *                 description: Number of seat rows
 *               columnCount:
 *                 type: integer
 *                 description: Number of seat columns
 *     responses:
 *       200:
 *         description: Cinema updated successfully
 *       400:
 *         description: Validation error or duplicate cinema name
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Cinema not found
 *       500:
 *         description: Server error
 */
router.put("/:cinema_id", verifyToken, isAdmin, cinemaController.updateCinemaController);

/**
 * @swagger
 * /cinemas/{cinema_id}:
 *   delete:
 *     summary: Remove a specific cinema
 *     tags: [Cinemas]
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
 *         description: Cinema deleted successfully
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Cinema not found
 *       500:
 *         description: Server error
 */
router.delete("/:cinema_id", verifyToken, isAdmin, cinemaController.deleteCinemaController);

export default router;