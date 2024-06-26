import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { commentPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPost, likeUnLike } from '../controllers/postControler.js'


const router = express.Router()

router.get('/all', protectRoute, getAllPosts)
router.get('/following', protectRoute, getFollowingPosts)
router.get('/user/:username', protectRoute, getUserPost)
router.get('/likes/:id', protectRoute, getLikedPosts)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.post('/like/:id', protectRoute, likeUnLike)
router.post('/comment/:id', protectRoute, commentPost)




export default router