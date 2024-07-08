import React from 'react'
import "./foodDisplay.css"
import { useStoreContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem'



const FoodDisplay = ({category}) => {

    const {food_list} = useStoreContext()


  return (
    <div className='food-display'>

        <h2>Top Dishes near you</h2>

        <div className='food-display-list'>

            {food_list.map((foodItem , index) => {
                if(category === "All" || category === foodItem.category){
                    return <FoodItem key={index} foodItem={foodItem}/>
                }
            })}

        </div>

    </div>
  )
}

export default FoodDisplay