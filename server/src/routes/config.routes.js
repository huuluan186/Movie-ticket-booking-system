import express from "express";
import * as configController from '../controllers/config.controller.js';

const router = express.Router()

router.get('/',configController.getVipPriceIncrementController)

export default router;