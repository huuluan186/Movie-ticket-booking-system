import express from "express"
import * as cinemaController from '../controllers/cinema.controller'
import { uploadImages, attachImagePaths } from '../middlewares/upload'

const router = express.Router()

//router cho các api liên quan đến cinema chain
router.post('/', uploadImages(), attachImagePaths(), cinemaController.createCinemaChainController)
router.get('/', cinemaController.getAllCinemaChainsController)
router.get('/:chain_id', cinemaController.getCinemaChainByIdController)
router.put('/:chain_id', uploadImages(), attachImagePaths(), cinemaController.updateCinemaChainController)
router.delete('/:chain_id', cinemaController.deleteCinemaChainController)
export default router;