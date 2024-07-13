import Food from "../models/foodModel.js"
import fs from "fs";


const addFood = async (req , res , next) => {

    try {
        
        const {name , description , price , category } = req.body

        const imageFileName = req.file.filename

        const food = new Food({
            name,
            description,
            price,
            category ,
            image : imageFileName
        })

        await food.save()

        res.status(201).json(food)

    } catch (error) {
        next(error)
    }
}





const getAllFood = async (req , res , next) => {

    try {

        const page = Number(req.query.page) || 1
        const limit = 10

        const skip = (page - 1) * limit

        const foods = await Food.find().skip(skip).limit(limit)

        const totalFoods = await Food.countDocuments()

        res.json({
            foods ,
            page ,
            totalPages : Math.ceil(totalFoods / limit) ,
            totalFoods
        })

    } catch (error) {
        next(error)        
    }
}




const removeFood = async (req , res , next) => {

    try {
        
        const {foodId} = req.params

        const food = await Food.findById(foodId)

        fs.unlink(`${process.env.PUBLIC_PATH}/${food.image}` , (err) => {
            if(err){
                console.log(`Error while remove image form folder : ${err}`)
            }
        })

        await Food.deleteOne({_id : foodId})
        
        res.status(200).json({msg : "Food deleted successfully"})

    } catch (error) {
        console.log(error)
    }
}




export {addFood , getAllFood , removeFood}