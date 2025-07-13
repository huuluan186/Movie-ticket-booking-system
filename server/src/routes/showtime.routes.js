import express from 'express';
import * as showtimeController from '../controllers/showtime.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';

const router = express.Router();

//showtimes of movie api
router.post('/:movie_id', verifyToken, isAdmin, showtimeController.createShowtime);
router.get('/', showtimeController.getShowtimesByQueryController);
router.get('/:showtime_id', showtimeController.getShowtimeDetailController);
router.delete('/:showtime_id', verifyToken, isAdmin, showtimeController.deleteShowtimeController);
router.delete('/', showtimeController.autoDeleteShowtimeController);
router.put('/:showtime_id', verifyToken, isAdmin, showtimeController.updateShowtimeController)

export default router;