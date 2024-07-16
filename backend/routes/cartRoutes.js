import express from "express"
import { addToCart , removeFromCart , getUserCart } from "../controllers/cartControllers.js"

import auth from "../middleware/auth.js"


const cartRouter = express.Router()


cartRouter.post("/addToCart" , auth , addToCart)

cartRouter.post("/remove" , auth , removeFromCart)

cartRouter.get("/" , auth , getUserCart)







export default cartRouter