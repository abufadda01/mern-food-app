import express from "express"
import { placeOrder , verifyOrder , getUserOrders, getAllOrders } from "../controllers/orderControllers.js"

import auth from "../middleware/auth.js"


const orderRouter = express.Router()


orderRouter.post("/place" , auth , placeOrder)

orderRouter.post("/verify" , auth , verifyOrder)

orderRouter.get("/" , auth , getUserOrders)

orderRouter.get("/admin" , getAllOrders)


export default orderRouter