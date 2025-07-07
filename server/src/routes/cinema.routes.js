import express from "express"
import * as cinemaController from '../controllers/cinema.controller'
import verifyToken from "../middlewares/verifyToken"
import { isAdmin } from "../middlewares/userAuthentication"

const router = express.Router()

router.post("/", verifyToken, isAdmin, cinemaController.createCinemaController)
router.get("/",cinemaController.getAllCinemasController)
router.get("/:cinema_id",cinemaController.getCinemaByIdController)
router.put("/:cinema_id", verifyToken, isAdmin, cinemaController.updateCinemaController)
router.delete("/:cinema_id", verifyToken, isAdmin, cinemaController.deleteCinemaController)

export default router;
