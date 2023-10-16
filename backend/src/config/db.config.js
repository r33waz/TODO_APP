import mongoose from "mongoose";


export const DBconnect = async () => {
    const MONGO_URL = process.env.MONGO_URL;
    try {
        const connection = await mongoose.connect(MONGO_URL)
        console.log(`MongDB Data-Base is connected on`,connection.connection.host)
    } catch (error) {
        console.log(error)
    }
}