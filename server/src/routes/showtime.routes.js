import express from 'express';
import * as showtimeController from  '../controllers/showtime.controller';

const router = express.Router();

//showtimes of movie api
router.post('/:movie_id', showtimeController.createShowtime);
router.get('/', showtimeController.getShowtimesByQueryController);
router.get('/:showtime_id', showtimeController.getShowtimeDetailController);
router.delete('/:showtime_id', showtimeController.deleteShowtimeController);
router.delete('/', showtimeController.autoDeleteShowtimeController);
router.put('/:showtime_id', showtimeController.updateShowtimeController)

export default router;