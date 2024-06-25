import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import connectMongoDb from './config/db.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3300


app.use('/auth', authRoute)

app.listen(PORT, () => {

    console.log(`server is working on ${PORT}`)
    connectMongoDb()
})