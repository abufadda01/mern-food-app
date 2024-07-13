import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name: {
        type : String ,
        required : true
    },
    email: {
        type : String ,
        required : true ,
        unique : true
    },
    password: {
        type : String ,
        required : true ,
    },
    cartData: {
        type : Object ,
        default : {}
    },
    // to create cartData key even if we not provide any data to it 
} , {minimize : false})




userSchema.pre("save" , async function(next) {
    
    if(!this.isModified("password")){
        next() 
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword

})



userSchema.methods.signJWT = function(next) {
    return jwt.sign({})
}



const User = mongoose.model("users" , userSchema)


export default User