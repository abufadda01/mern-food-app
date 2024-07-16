import React, { useEffect } from 'react'
import "./orders.css"
import { useState } from 'react'
import { axiosObj } from '../../../../client/src/utils/axios'
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';



const Orders = () => {

  const [orders , setOrders] = useState([])
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);


  const getUsersOrders = async (e) => {

    try {
      
      const response = await axiosObj.get(`/order/admin?page=${page}`)
      setOrders(response.data.usersOrders)
      setTotalPages(response.data.totalPages)

    } catch (error) {
      console.log(error)    
    }

  }



  useEffect(() => {
    getUsersOrders();
  }, [page]);



  const handlePageChange = (newPage) => {
    setPage(newPage);
  };





  return (
    <div className='order add'>

      <h3>Order Page</h3>

      <div className='order-list'>
      
        {orders?.map((order) => (
          <div key={order?._id} className='order-item'>

            <img src={assets.parcel_icon} alt="" />

            <div>

              <p className='order-item-food'>

                {order.items.map((item , index) => {
                  if(index === order.items.length - 1){
                    return item.name + " x " + item.quantity
                  }else{
                    return item.name + " x " + item.quantity + ", "                    
                  }
                })}
              </p>

              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              
              <div className='order-item-address'>
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
               
              <p className='order-item-phone'>{order.address.phone}</p>

            </div>
            
            <p>num of items : {order.items.length}</p>
            <p>${order.amount}.00</p>

            <select>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>

        ))}
      
      </div>

    </div>
  )
}

export default Orders