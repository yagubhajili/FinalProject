import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { deleteNotif, deleteOneNotif, getNotif } from '../controllers/notificationController.js'


const router = express.Router()

router.get('/', protectRoute, getNotif)
router.delete('/', protectRoute, deleteNotif)
router.delete('/:id', protectRoute, deleteOneNotif)




export default router
