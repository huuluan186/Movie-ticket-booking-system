import express from "express"
import * as cinemaController from '../controllers/cinema.controller'

const router = express.Router()

router.post("/",cinemaController.createCinemaClusterController)
router.get("/",cinemaController.getAllCinemaClustersController)
router.get("/:cluster_id",cinemaController.getCinemaClusterByIdController)
router.put("/:cluster_id",cinemaController.updateCinemaClusterController)
router.delete("/:cluster_id",cinemaController.deleteCinemaClusterController)

export default router;
