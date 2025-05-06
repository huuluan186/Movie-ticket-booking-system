import express from 'express';
import * as movieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/statuses', movieController.getMovieStatuses);
router.post('/', movieController.createMovie);
router.get('/:movieId',movieController.getMovieDetail)
export default router;