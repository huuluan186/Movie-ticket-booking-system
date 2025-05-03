import express from 'express';
import * as movieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/get-all-status', movieController.getMovieStatuses);

export default router;