import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'



export const getUserProfile = async (req, res) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ username }).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

}

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params
        const userTOModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id)
        if (id === req.user._id) {
            return res.status(400).json({ message: ' You cant follow/unwollow yourself' })
        }
        if (!userTOModify || !currentUser) {
            return res.status(400).json({ error: 'User not found' })
        }
        const isFollowing = currentUser.following.includes(id)
        if (isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            res.status(200).json({ message: 'unfollowed succesfully' })

        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            const newNotification = new Notification({
                type: 'follow',
                from: req.user._id,
                to: userTOModify._id
            })
            await newNotification.save()
            res.status(200).json()

        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const getSuggestedProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const usersFollowedByMe = await User.findById(userId).select('following')
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            {
                $sample: { size: 10 }
            }
        ])
        const filteredUSers = users.filter(user => !usersFollowedByMe.following.includes(user._id))
        const suggestedUsers = filteredUSers.slice(0, 4)
        suggestedUsers.forEach(user => user.password = null)
        res.status(200).json(suggestedUsers)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}


export const updateUser = async (req, res) => {
    const { username, fullName, email, currentPassword, newPassword, bio, link } = req.body
    let { profileImg, coverImg } = req.body

    const userId = req.user._id
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: 'Please provide new and current password ' })
        }
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password)
            if (!isMatch) {
                return res.status(400).json({ error: 'Current password is incorrect' })
            }
            if (newPassword.length < 6) {
                return res.status(400).json({ error: 'password must be at least 6 charecters' })
            }
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(newPassword, salt)
        }
        if (coverImg) {

        }
        if (profileImg) {

        }

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}