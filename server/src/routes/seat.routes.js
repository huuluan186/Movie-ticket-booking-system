import express from 'express';
import * as seatController from  '../controllers/seat.controller';

const router = express.Router();

router.get('/:cinema_id',seatController.getCinemaSeatLayoutController)

export default router;