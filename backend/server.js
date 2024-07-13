import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import foodRouter from "./routes/FoodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import fs from "fs";
import path from "path";

const __dirname =  path.resolve()

dotenv.config({path : "./.env"})

 
const app = express()  


// add error handler middleware

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use("/images" , express.static("uploads"));


const uploadDir = path.join(__dirname , 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



app.use("/api/food" , foodRouter)
app.use("/api/user" , userRouter)


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