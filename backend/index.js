import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import notificationtRoute from './routes/notificationRoute.js'
import connectMongoDb from './config/db.js'
import cookieParser from 'cookie-parser'


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 3300

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/notifications', notificationtRoute)




app.listen(PORT, () => {

    console.log(`server is working on ${PORT}`)
    connectMongoDb()
})