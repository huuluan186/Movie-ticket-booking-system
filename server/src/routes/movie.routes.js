import express from 'express';
import * as movieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/statuses', movieController.getMovieStatuses);
router.post('/', movieController.createMovie);
router.get('/:movieId',movieController.getMovieDetail)
router.put('/:movieId', movieController.updateMovie);
router.delete('/:movieId', movieController.deleteMovie);
export default router;