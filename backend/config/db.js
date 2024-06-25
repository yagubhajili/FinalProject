import mongoose from "mongoose";


const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("error", error.message)
    }
}
export default connectMongoDb