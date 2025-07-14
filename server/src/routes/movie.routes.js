import express from 'express';
import * as movieController from '../controllers/movie.controller.js';
import { uploadImages, attachImagePaths } from '../middlewares/upload.js';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';

const router = express.Router();

/**
 * @swagger
 * /movies/statuses:
 *   get:
 *     summary: Retrieve list of movie statuses
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Movie statuses retrieved successfully
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
 *       500:
 *         description: Server error
 */
router.get('/statuses', movieController.getMovieStatuses);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve list of movies (with optional status filter)
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['Coming Soon', 'Now Showing']
 *         description: Filter by movie status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of movies to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Page offset for pagination
 *     responses:
 *       200:
 *         description: List of movies retrieved successfully
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
 *                         $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Server error
 */
router.get('/', movieController.getMoviesController);

/**
 * @swagger
 * /movies/{movieId}:
 *   get:
 *     summary: Retrieve movie details by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       200:
 *         description: Movie details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.get('/:movieId', movieController.getMovieDetail);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               country:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: integer
 *               release_date:
 *                 type: string
 *                 format: date
 *               age_limit:
 *                 type: string
 *               director:
 *                 type: string
 *               cast:
 *                 type: string
 *               description:
 *                 type: string
 *               linkTrailer:
 *                 type: string
 *               poster:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: string
 *                 enum: ['Coming Soon', 'Now Showing']
 *             required: ['title', 'country', 'genre', 'duration', 'release_date', 'status']
 *     responses:
 *       200:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Missing required fields
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
router.post('/', uploadImages(), attachImagePaths(), movieController.createMovie);

/**
 * @swagger
 * /movies/{movieId}:
 *   put:
 *     summary: Update a specific movie
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               country:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: integer
 *               release_date:
 *                 type: string
 *                 format: date
 *               age_limit:
 *                 type: string
 *               director:
 *                 type: string
 *               cast:
 *                 type: string
 *               description:
 *                 type: string
 *               linkTrailer:
 *                 type: string
 *               poster:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: string
 *                 enum: ['Coming Soon', 'Now Showing']
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.put('/:movieId', verifyToken, isAdmin, uploadImages(), attachImagePaths(), movieController.updateMovie);

/**
 * @swagger
 * /movies/{movieId}:
 *   delete:
 *     summary: Delete a specific movie
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       401:
 *         description: Unauthorized (requires admin role)
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.delete('/:movieId', verifyToken, isAdmin, movieController.deleteMovie);

export default router;