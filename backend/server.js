import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import foodRouter from "./routes/FoodRoutes.js"

dotenv.config({path : "./.env"})

 
const app = express()  


// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));


app.use("/api/food" , foodRouter)



const port = process.env.PORT

const start = async () => {
    try {
        app.listen(port , () => {console.log(`food website started on port ${port}`)})
        await connectDB()        
    } catch (error) {
        console.log(error)
    }
}


start()