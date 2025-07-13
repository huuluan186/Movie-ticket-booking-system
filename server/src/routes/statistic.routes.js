import express from 'express';
import * as statisticsController from '../controllers/statistic.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/userAuthentication.js';


const router = express.Router();

// Thống kê doanh thu theo phim
router.get('/movies', verifyToken, isAdmin, statisticsController.getRevenueByMovie);
//Thống kê doanh thu theo cụm rạp
router.get('/clusters', verifyToken, isAdmin, statisticsController.getRevenueByCluster);

export default router;
