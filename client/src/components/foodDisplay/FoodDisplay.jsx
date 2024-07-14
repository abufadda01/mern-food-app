import React, { useEffect, useState } from 'react'
import "./foodDisplay.css"
import { useStoreContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem'
import { axiosObj } from '../../utils/axios'


const FoodDisplay = ({category}) => {

    const {food_list , foodList , setFoodList , token} = useStoreContext()
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);


    const fetchFoodList = async () => {
        try {
            const response = await axiosObj.get(`/food?page=${page}`)
            setFoodList(response.data.foods)
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchFoodList()
    } , [token , page])



    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };



  return (
    <div className='food-display'>

        <h2>Top Dishes near you</h2>

        <div className='food-display-list'>

            {foodList.map((foodItem , index) => {
                if(category === "All" || category === foodItem.category){
                    return <FoodItem key={index} foodItem={foodItem}/>
                }
            })}

        </div>

        <div className='pagination-controls'>
            <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
        </div>

    </div>
  )
}

export default FoodDisplay