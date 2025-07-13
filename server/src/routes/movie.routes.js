import express from 'express';
import * as movieController from '../controllers/movie.controller.js';
import { uploadImages, attachImagePaths } from '../middlewares/upload.js';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';

const router = express.Router();

router.get('/statuses', movieController.getMovieStatuses);
router.get('/', movieController.getMoviesController);
router.get('/:movieId', movieController.getMovieDetail);
router.post('/', uploadImages(), attachImagePaths(), movieController.createMovie);
router.put('/:movieId', verifyToken, isAdmin, uploadImages(), attachImagePaths(), movieController.updateMovie);
router.delete('/:movieId', verifyToken, isAdmin, movieController.deleteMovie);

export default router;