import React, { useState , useEffect } from 'react'
import "./list.css"
import { axiosObj } from '../../utils/axios'
import {toast} from 'react-toastify';
import { assets } from '../../assets/assets';


const List = () => {

  const [items , setItems] = useState([])
  const [page , setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);


  const getFoodItems = async () => {
    try {
      const response = await axiosObj.get(`/food?page=${page}`)
      setItems(response.data.foods)
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }


  const removeFoodItem = async (foodId) => {
    try {
      await axiosObj.delete(`/food/${foodId}`)
      await getFoodItems()
      toast.info("Food item removed successfully")
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }


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


  useEffect(() => {
    getFoodItems()
  } , [page])



  return (
    <div className='list add flex-col'>

      <p>All Food Items</p>

      <div className='list-table'>

        <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>

        {items.map((item , index) => {
          return (
            <div key={index} className='list-table-format'>
              <img className='item-img' src={`http://localhost:5000/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFoodItem(item?._id)} className='remove-item'>X</p>
            </div>
          )
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

export default List