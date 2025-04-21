import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as userController from '../controllers/user.controller'

const router = express.Router()

router.use(verifyToken)
router.get('/get-current-user', userController.getUserInfo)


export default router