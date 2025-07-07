import express from 'express';
import * as statisticsController from '../controllers/statistic.controller';

const router = express.Router();

// Thống kê doanh thu theo phim
router.get('/movies', statisticsController.getRevenueByMovie);
//Thống kê doanh thu theo cụm rạp
router.get('/clusters', statisticsController.getRevenueByCluster);

export default router;
