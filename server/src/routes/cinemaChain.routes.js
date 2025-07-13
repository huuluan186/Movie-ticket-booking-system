import express from "express";
import * as cinemaController from '../controllers/cinema.controller.js';
import { uploadImages, attachImagePaths } from '../middlewares/upload.js';
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/userAuthentication.js";

const router = express.Router();

/**
 * @swagger
 * /cinemachains:
 *   post:
 *     summary: Create a new cinema chain.
 *     tags: [Cinema Chains]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               chain_name:
 *                 type: string
 *                 description: Name of the cinema chain
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo image of the cinema chain
 *             required: ['chain_name']
 *     responses:
 *       200:
 *         description: Cinema chain created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaChain'
 *       400:
 *         description: Missing required field (chain_name) or duplicate chain name
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
router.post('/', verifyToken, isAdmin, uploadImages(), attachImagePaths(), cinemaController.createCinemaChainController);

/**
 * @swagger
 * /cinemachains:
 *   get:
 *     summary: Retrieve all cinema chains.
 *     tags: [Cinema Chains]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of cinema chains.
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
 *                         $ref: '#/components/schemas/CinemaChain'
 *       500:
 *         description: Server error
 */
router.get('/', cinemaController.getAllCinemaChainsController);

/**
 * @swagger
 * /cinemachains/{chain_id}:
 *   get:
 *     summary: Get details of a cinema chain by ID.
 *     tags: [Cinema Chains]
 *     parameters:
 *       - in: path
 *         name: chain_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema chain
 *     responses:
 *       200:
 *         description: Cinema chain details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaChain'
 *       404:
 *         description: Cinema chain not found
 *       500:
 *         description: Server error
 */
router.get('/:chain_id', cinemaController.getCinemaChainByIdController);

/**
 * @swagger
 * /cinemachains/{chain_id}:
 *   put:
 *     summary: Update a cinema chain.
 *     tags: [Cinema Chains]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chain_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema chain
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               chain_name:
 *                 type: string
 *                 description: Name of the cinema chain
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo image of the cinema chain
 *     responses:
 *       200:
 *         description: Successfully update a cinema chain.
 *       400:
 *         description: Validation error or duplicate chain name
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Cinema chain not found
 *       500:
 *         description: Server error
 */
router.put('/:chain_id', verifyToken, isAdmin, uploadImages(), attachImagePaths(), cinemaController.updateCinemaChainController);

/**
 * @swagger
 * /cinemachains/{chain_id}:
 *   delete:
 *     summary: Delete a cinema chain.
 *     tags: [Cinema Chains]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chain_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cinema chain
 *     responses:
 *       200:
 *         description: Successfully delete a cinema chain.
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Cinema chain not found
 *       500:
 *         description: Server error
 */
router.delete('/:chain_id', verifyToken, isAdmin, cinemaController.deleteCinemaChainController);

export default router;