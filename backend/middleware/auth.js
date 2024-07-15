import jwt from "jsonwebtoken"
import User from "../models/userModel.js"


const auth = async (req , res , next) => {

    let token 

    try {
        
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }
    
        if(!token){
            return res.status(401).json({msg : "Not authorized to access this route"})
            // next(createError("Not authorized to access this route" , 401))
        }
    
        jwt.verify(token , process.env.JWT_SECRET , async (err , decodedToken) => {
    
            if(err){
                return res.status(403).json({msg : "Access Forbidden"})

                // next(createError("Access Forbidden" , 403)) 
            }
    
            // create a req key called user , contain the id for logged user
            req.user = await User.findById(decodedToken.id).select("-password")
            
            next()
        
        })
    
    } catch (error) {
        next(error)    
    }
    
}


export default auth