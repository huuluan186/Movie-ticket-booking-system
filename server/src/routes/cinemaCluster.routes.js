import express from "express";
import * as cinemaController from '../controllers/cinema.controller.js';
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/userAuthentication.js";

const router = express.Router()

router.post("/", verifyToken, isAdmin, cinemaController.createCinemaClusterController)
router.get("/",cinemaController.getAllCinemaClustersController)
router.get("/:cluster_id",cinemaController.getCinemaClusterByIdController)
router.put("/:cluster_id", verifyToken, isAdmin, cinemaController.updateCinemaClusterController)
router.delete("/:cluster_id", verifyToken, isAdmin, cinemaController.deleteCinemaClusterController)

export default router;
