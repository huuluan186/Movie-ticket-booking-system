import express from "express"
import * as cinemaController from '../controllers/cinema.controller'

const router = express.Router()

router.post("/",cinemaController.createCinemaController)
router.get("/",cinemaController.getAllCinemasController)
router.get("/:cinema_id",cinemaController.getCinemaByIdController)
router.put("/:cinema_id",cinemaController.updateCinemaController)
router.delete("/:cinema_id",cinemaController.deleteCinemaController)

export default router;
