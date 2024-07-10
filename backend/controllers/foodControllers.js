import Food from "../models/foodModel.js"


const addFood = async (req , res , next) => {

    try {

        console.log(req.body)
        
        const {name , description , price , categorty} = req.body

        const imageFileName = req.file.filename

        const food = new Food({
            name,
            description,
            price,
            categorty,
            image : imageFileName
        })

        await food.save()

        res.status(201).json(food)

    } catch (error) {
        next(error)
    }
}



export {addFood}