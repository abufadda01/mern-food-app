import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users" ,
        required : true
    },
    items : {
        type : Array ,
        required : true
    },
    amount : {
        type : Number ,
        required : true
    },
    address : {
        type : Object ,
        required : true
    },
    status : {
        type : String ,
        default : "Food processing"
    },
    date : {
        type : Date ,
        default : Date.now()
    },
    payment : {
        type : Boolean ,
        default : false
    }
} , {timestamps : true})



const Order = mongoose.model("orders" , orderSchema)


export default Order