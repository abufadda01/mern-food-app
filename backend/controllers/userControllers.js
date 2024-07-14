import User from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt";



const register = async (req , res , next) => {

    try {
        
        const {name , email , password} = req.body

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({msg : "User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({msg : "please enter a valid email structure"})            
        }
        
        if(password.length < 8){
            return res.status(400).json({msg : "please enter a strong password"})                        
        }

        const newUser = new User({
            name ,
            email ,
            password
        })

        await newUser.save()
        
        newUser.password = undefined

        const token = newUser.signJWT()

        res.status(201).json({newUser , token})

    } catch (error) {
        next(error)
    }
}




const login = async (req , res , next) => {

    try {
        
        const {email , password} = req.body

        const user = await User.findOne({email}).select("+password")

        if(!user){
            return res.status(400).json({msg : "Invalid Credentials"})
        }

        const isPasswordMatched = await bcrypt.compare(password , user.password)

        if(!isPasswordMatched){ 
            return res.status(400).json({msg : "Invalid Credentials"})
        }

        user.password = undefined

        const token = user.signJWT()

        res.status(200).json({user , token})

    } catch (error) {
        
    }
}




export {register , login}