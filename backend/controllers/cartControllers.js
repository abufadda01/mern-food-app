import User from "../models/userModel.js"



const addToCart = async (req , res , next) => {

    try {
        
        const {itemId} = req.body

        const user = await User.findById(req.user._id)

        let cartData = user.cartData

        // if the item not exist in the cart add its _id as a key with 1 length
        // the key inside the cartData object will be the {_id value of the item : the count of it} {6693bf5b1afbdeafc202778e : 1}
        if(!cartData[itemId]){
            cartData[itemId] = 1
        // if item already in the cart keep its length and add 1 to it
        }else{
            cartData[itemId] += 1
        }


        await User.findByIdAndUpdate(req.user._id , {cartData} ,  {new : true})

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }

}




const removeFromCart = async (req , res , next) => {

    try {
        
        const {itemId} = req.body

        const user = await User.findById(req.user._id)

        let cartData = user.cartData

        if(cartData[itemId] > 0) {

            cartData[itemId] -= 1

            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

        }

        await User.findByIdAndUpdate(req.user._id , {cartData} ,  {new : true})

        res.status(200).json(user)

    } catch (error) {
        next(error)        
    }

}




const getUserCart = async (req , res , next) => {

    try {
        
        const user = await User.findById(req.user._id)

        let cartData = user.cartData

        res.status(200).json(cartData)

    } catch (error) {
        next(error)
    }

}




export {addToCart , removeFromCart , getUserCart}