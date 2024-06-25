import { generateTokenAndSetCookie } from "../lib/utils/generateToke.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" })
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" })
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            (newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        } else {
            res.status(400).json({ error: "invalid user data" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordsCorrect = await bcrypt.compare(password, user?.password || '')
        if (!user || !isPasswordsCorrect) {
            res.status(400).json({ error: 'Inavlid Username or Password' })
        }
        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: newUser._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });

    }
}
export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({
            message: 'logged out succesully'
        })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });

    }
}

export const authCheck = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });

    }
}