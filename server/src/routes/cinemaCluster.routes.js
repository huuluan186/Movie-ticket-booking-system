import express from "express";
import * as cinemaController from '../controllers/cinema.controller.js';
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/userAuthentication.js";

const router = express.Router();

/**
 * @swagger
 * /cinemaclusters:
 *   post:
 *     summary: Create a new cinema cluster
 *     tags: [Cinema Clusters]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cluster_name:
 *                 type: string
 *                 description: Name of the cinema cluster
 *               address:
 *                 type: string
 *                 description: Address of the cluster
 *               chain_id:
 *                 type: string
 *                 description: ID of the associated cinema chain
 *             required: ['cluster_name', 'chain_id']
 *     responses:
 *       200:
 *         description: Cinema cluster created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaCluster'
 *       400:
 *         description: Missing required fields (cluster_name, chain_id) or duplicate cluster name
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
router.post("/", verifyToken, isAdmin, cinemaController.createCinemaClusterController);

/**
 * @swagger
 * /cinemaclusters:
 *   get:
 *     summary: Retrieve all cinema clusters (optionally filtered by chain)
 *     tags: [Cinema Clusters]
 *     parameters:
 *       - in: query
 *         name: chain_id
 *         schema:
 *           type: string
 *         description: Filter by cinema chain ID
 *     responses:
 *       200:
 *         description: List of cinema clusters retrieved successfully
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
 *                         $ref: '#/components/schemas/CinemaCluster'
 *       500:
 *         description: Server error
 */
router.get("/", cinemaController.getAllCinemaClustersController);

/**
 * @swagger
 * /cinemaclusters/{cluster_id}:
 *   get:
 *     summary: Retrieve details of a specific cinema cluster by ID
 *     tags: [Cinema Clusters]
 *     parameters:
 *       - in: path
 *         name: cluster_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema cluster
 *     responses:
 *       200:
 *         description: Cinema cluster details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaCluster'
 *       404:
 *         description: Cinema cluster not found
 *       500:
 *         description: Server error
 */
router.get("/:cluster_id", cinemaController.getCinemaClusterByIdController);

/**
 * @swagger
 * /cinemaclusters/{cluster_id}:
 *   put:
 *     summary:  Update a specific cinema cluster
 *     tags: [Cinema Clusters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cluster_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema cluster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cluster_name:
 *                 type: string
 *                 description: Name of the cinema cluster
 *               address:
 *                 type: string
 *                 description: Address of the cluster
 *               chain_id:
 *                 type: string
 *                 description: ID of the associated cinema chain
 *     responses:
 *       200:
 *         description: Cinema cluster updated successfully
 *       400:
 *         description: Validation error or duplicate cluster name
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Cinema cluster not found
 *       500:
 *         description: Server error
 */
router.put("/:cluster_id", verifyToken, isAdmin, cinemaController.updateCinemaClusterController);

/**
 * @swagger
 * /cinemaclusters/{cluster_id}:
 *   delete:
 *     summary: Delete a specific cinema cluster
 *     tags: [Cinema Clusters]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cluster_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema cluster
 *     responses:
 *       200:
 *         description: Cinema cluster deleted successfully
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Cinema cluster not found
 *       500:
 *         description: Server error
 */
router.delete("/:cluster_id", verifyToken, isAdmin, cinemaController.deleteCinemaClusterController);

export default router;