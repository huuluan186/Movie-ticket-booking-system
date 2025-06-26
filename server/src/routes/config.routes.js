import express from "express"
import * as configController from '../controllers/config.controller'

const router = express.Router()

router.get('/',configController.getVipPriceIncrementController)

export default router;