import express from 'express';
import * as movieController from '../controllers/movie.controller';
import { uploadImages, attachImagePaths } from '../middlewares/upload';

const router = express.Router();

router.get('/statuses', movieController.getMovieStatuses);
router.get('/', movieController.getMoviesController);
router.get('/:movieId', movieController.getMovieDetail);
router.post('/', uploadImages(), attachImagePaths(), movieController.createMovie);
router.put('/:movieId', uploadImages(), attachImagePaths(), movieController.updateMovie);
router.delete('/:movieId', movieController.deleteMovie);

export default router;