import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import connectMongoDb from './config/db.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3300

app.use(express.json())

app.use(cookieParser())
app.use('/auth', authRoute)
app.use('/users', userRoute)


app.listen(PORT, () => {

    console.log(`server is working on ${PORT}`)
    connectMongoDb()
})