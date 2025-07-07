import express from "express"
import * as cinemaController from '../controllers/cinema.controller'
import { uploadImages, attachImagePaths } from '../middlewares/upload'
import verifyToken from "../middlewares/verifyToken"
import { isAdmin } from "../middlewares/userAuthentication"

const router = express.Router()

//router cho các api liên quan đến cinema chain
router.post('/', verifyToken, isAdmin, uploadImages(), attachImagePaths(), cinemaController.createCinemaChainController)
router.get('/', cinemaController.getAllCinemaChainsController)
router.get('/:chain_id', cinemaController.getCinemaChainByIdController)
router.put('/:chain_id', verifyToken, isAdmin, uploadImages(), attachImagePaths(), cinemaController.updateCinemaChainController)
router.delete('/:chain_id', verifyToken, isAdmin, cinemaController.deleteCinemaChainController)
export default router;