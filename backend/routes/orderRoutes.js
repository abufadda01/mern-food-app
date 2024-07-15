import express from "express"
import { placeOrder , verifyOrder } from "../controllers/orderControllers.js"

import auth from "../middleware/auth.js"


const orderRouter = express.Router()


orderRouter.post("/place" , auth , placeOrder)

orderRouter.post("/verify" , auth , verifyOrder)


export default orderRouter