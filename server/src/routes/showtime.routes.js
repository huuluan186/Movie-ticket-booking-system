import express from 'express';
import * as showtimeController from  '../controllers/showtime.controller';
import verifyToken from '../middlewares/verifyToken';
import { isAdmin } from '../middlewares/userAuthentication';

const router = express.Router();

//showtimes of movie api
router.post('/:movie_id', verifyToken, isAdmin, showtimeController.createShowtime);
router.get('/', showtimeController.getShowtimesByQueryController);
router.get('/:showtime_id', showtimeController.getShowtimeDetailController);
router.delete('/:showtime_id', verifyToken, isAdmin, showtimeController.deleteShowtimeController);
router.delete('/', showtimeController.autoDeleteShowtimeController);
router.put('/:showtime_id', verifyToken, isAdmin, showtimeController.updateShowtimeController)

export default router;