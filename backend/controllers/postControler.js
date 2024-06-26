import Notifications from "../models/notificationModel.js"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"
import { v2 as cloudinary } from 'cloudinary'


export const createPost = async (req, res) => {
    try {
        let { text, img } = req.body
        const userId = req.user._id.toString()
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (!text && !img) {
            return res.status(400).json({ error: 'Psot mys have text or image' })
        }

        if (img) {
            const uploaded = cloudinary.uploader.upload(img)
            img = uploaded.secure_url
        }

        const newPost = new Post({
            user: userId,
            text,
            img
        })
        await newPost.save()
        res.status(201).json(newPost)

    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}


export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ error: 'post not found' })
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unathorized to delete the post' })
        }
        if (post.img) {
            const imgId = post.img.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(imgId)
        }
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: ' post deleted succesfully' })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const commentPost = async (req, res) => {
    try {
        const { text } = rqe.body
        const postId = req.params.id
        const userId = req.user._id
        if (!text) {
            return res.status(400).json({ error: 'text is required' })
        }
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ error: 'post not found' })
        }

        const comment = { user: userId, text }
        post.comments.push(comment)
        await post.save()

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ error: "internal servere error" });
    }
}

export const likeUnLike = async (req, res) => {
    try {
        const userId = req.user._id
        const { id } = req.params
        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }
        const likedPost = post.likes.includes(userId)
        if (likedPost) {
            await Post.updateOne({ _id: id }, { $pull: { likes: userId } })
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: id } })
            res.status(200).json({ message: "post unliked" })
        } else {
            post.likes.push(userId)
            await User.updateOne({ _id: userId }, { $push: { likedPosts: id } })
            await post.save()
            const notification = new Notifications({
                from: userId,
                to: post.user,
                type: 'like'
            })
            await notification.save()
            res.status(200).json({ message: 'post liked' })
        }

    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = Post.find().sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'

        })

        if (posts.length === 0) {
            return res.status(200).json([])
        }

        res.status(200).json(posts)


    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}

export const getLikedPosts = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'post not found' })
        }
        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'
        })
        res.status(200).json(likedPosts)

    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}

export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'post not found' })
        }

        const following = user.following
        const followingPosts = await Post.find({ user: { $in: following } }).sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'
        })

        res.status(200).json(followingPosts)


    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}


export const getUserPost = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'post not found' })
        }

        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'
        })

        res.status(200).json(posts)



    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}