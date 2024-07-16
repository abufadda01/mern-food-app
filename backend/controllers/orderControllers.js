import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async (req , res , next) => {

    try {
        
        const front_end_url = "http://localhost:3000"

        const {items , amount , address} = req.body

        const newOrder = new Order({
            userId : req.user._id ,
            address ,
            amount ,
            items
        })

        await newOrder.save()

        await User.findByIdAndUpdate(req.user._id , {cartData : {}} , {new :  true})

        const line_items = items.map((item) => ({
            price_data : {
                currency : "USD" ,
                product_data : {
                    name : item.name ,
                },
                unit_amount : item.price * 100                
            },
            quantity : item.quantity
        }))


        line_items.push({
            price_data : {
                currency : "USD" ,
                product_data : {
                    name : "Delivery Fees" ,

                },
                unit_amount : 2 * 100                
            },
            quantity : 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items : line_items ,
            mode : "payment" ,
            success_url : `${front_end_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${front_end_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.status(201).json({session_url : session.url})

    } catch (error) {
        next(error)
    }
}





const verifyOrder = async (req , res , next) => {

    try {

        const {orderId , success} = req.body

        if(success === "true"){
            await Order.findByIdAndUpdate(orderId , {payment : true} , {new : true})
            res.status(200).json({msg : "order paid successfully" , success : true})
        }else{
            await Order.findByIdAndDelete(orderId)
            res.status(200).json({msg : "failed to pay the order" , success : false})
        }

    } catch (error) {
        next(error)
    }

}




const getUserOrders = async (req , res , next) => {

    try {

        const page = Number(req.query.page) || 1
        const limit = 10

        const skip = (page - 1) * limit

        const userOrders = await Order.find({userId : req.user._id}).skip(skip).limit(limit)

        const totalOrders = await Order.countDocuments()

        res.json({
            userOrders ,
            page ,
            totalPages : Math.ceil(totalOrders / limit) ,
            totalOrders
        })

    } catch (error) {
        next(error)
    }
}





const getAllOrders = async (req , res , next) => {

    try {
        
        const page = Number(req.query.page) || 1
        const limit = 10

        const skip = (page - 1) * limit

        const usersOrders = await Order.find({}).skip(skip).limit(limit)

        const totalOrders = await Order.countDocuments()

        res.json({
            usersOrders ,
            page ,
            totalPages : Math.ceil(totalOrders / limit) ,
            totalOrders
        })


    } catch (error) {
        next(error)
    }
}


  


const updateOrderStatus = async (req , res , next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.body.orderId , {status : req.body.status} , {new : true})
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}





export {placeOrder , verifyOrder , getUserOrders , getAllOrders , updateOrderStatus}