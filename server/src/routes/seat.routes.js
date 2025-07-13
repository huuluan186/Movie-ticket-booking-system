import express from 'express';
import * as seatController from '../controllers/seat.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/:cinema_id', verifyToken, seatController.createSeatsForCinemaController);
router.get('/', seatController.getCinemaSeatLayoutController)

export default router;