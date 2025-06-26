import express from 'express';
import * as seatController from  '../controllers/seat.controller';

const router = express.Router();

router.post('/:cinema_id', seatController.createSeatsForCinemaController);
router.get('/', seatController.getCinemaSeatLayoutController)

export default router;