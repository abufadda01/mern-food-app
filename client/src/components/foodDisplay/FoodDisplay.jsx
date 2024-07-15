import React, { useEffect } from 'react'
import "./foodDisplay.css"
import { useStoreContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem'



const FoodDisplay = ({ category }) => {

    const { foodList, fetchFoodList, page, setPage, totalPages, token } = useStoreContext();


    useEffect(() => {
        fetchFoodList(page);
    }, [token, page]);


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
                {foodList.map((foodItem, index) => {
                    if (category === "All" || category === foodItem.category) {
                        return <FoodItem key={index} foodItem={foodItem} />
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
