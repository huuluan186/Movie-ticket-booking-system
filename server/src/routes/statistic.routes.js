import express from 'express';
import * as statisticsController from '../controllers/statistic.controller';
import verifyToken from '../middlewares/verifyToken';
import { isAdmin } from '../middlewares/userAuthentication';

const router = express.Router();

// Thống kê doanh thu theo phim
router.get('/movies', verifyToken, isAdmin, statisticsController.getRevenueByMovie);
//Thống kê doanh thu theo cụm rạp
router.get('/clusters', verifyToken, isAdmin, statisticsController.getRevenueByCluster);

export default router;
