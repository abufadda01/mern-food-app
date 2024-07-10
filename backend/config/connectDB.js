import mongoose from "mongoose";

 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log("FOOD APP DATABASE CONNECTED SUCCESSFULLY"))
            .catch((err) => console.log(`FAILED IN CONNECTION TO THE DATABASE : ${err}`))
    } catch (error) {
        console.log(error)
    }
}


export default connectDB