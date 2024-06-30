import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { allUsers, followUnfollowUser, getSuggestedProfile, getUserProfile, updateUser } from '../controllers/userController.js'


const router = express.Router()


router.get('/profile/:username', protectRoute, getUserProfile)
router.get('/all', allUsers)

router.get('/suggested', protectRoute, getSuggestedProfile)
router.post('/follow/:id', protectRoute, followUnfollowUser)
router.post('/update', protectRoute, updateUser)





export default router