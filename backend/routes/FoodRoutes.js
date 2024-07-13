import express from "express"
import { addFood , getAllFood ,  removeFood} from "../controllers/foodControllers.js"

import upload from "../middleware/multer.js"

const foodRouter = express.Router()


foodRouter.post("/" , upload.single("image") , addFood)

foodRouter.get("/" , getAllFood)

foodRouter.delete("/:foodId" , removeFood)



export default foodRouter