import express from "express"
import { addFood } from "../controllers/foodControllers.js"

import upload from "../middleware/multer.js"

const foodRouter = express.Router()


foodRouter.post("/" , upload.single("image") , addFood)



export default foodRouter