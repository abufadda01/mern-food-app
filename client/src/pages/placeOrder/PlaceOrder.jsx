import React, { useEffect, useState } from 'react'
import "./place-order.css"
import { useStoreContext } from '../../context/StoreContext'
import { axiosObj } from '../../utils/axios'
import {useNavigate} from "react-router-dom"


const PlaceOrder = () => {

  const { getTotalCartAmount , token , cartItems , foodList} = useStoreContext()

  const navigate = useNavigate()

  const [data , setData] = useState({
    firstName : "" ,
    lastName : "" ,
    email : "" ,
    street : "" ,
    city : "" ,
    state : "" ,
    zipcode : "" ,
    country : "" ,
    phone : ""
  })

  
  const handleChange = e => {
    setData({...data , [e.target.name] : e.target.value})
  }



  const placeOrder = async (e) => {
  
    e.preventDefault();

      let orderItems = [];

      foodList?.forEach((item) => {

        if (cartItems[item?._id] > 0) {

          let itemInfo = {
            ...item,
            quantity: cartItems[item._id]
          };

          orderItems.push(itemInfo);

        }

      });

      let orderData = {
        address : data ,
        items : orderItems ,
        amount : getTotalCartAmount() + 2
      }

      const response = await axiosObj.post("/order/place" , orderData , {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })

      const {session_url} = response.data
      window.location.replace(session_url)

  };




  useEffect(() => {
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  } , [token])



  
  return (
    <form onSubmit={placeOrder} className='place-order'>
        
        <div className='place-order-left'>

          <p className='title'>Delivery Information</p>

          <div className='multi-fields'>
            <input name='firstName' value={data.firstName} onChange={handleChange} type="text" placeholder='First Name' />
            <input name='lastName' value={data.lastName} onChange={handleChange} type="text" placeholder='Last Name' />
          </div>

          <input name='email' onChange={handleChange} value={data.email} type="email" placeholder='name@example.com' />
          <input name='phone' onChange={handleChange} value={data.phone} type="text" placeholder='+962' />

          <input onChange={handleChange} name='country' value={data.country} type="text" placeholder='Country' />

          <div className='multi-fields'>
            <input name='city' onChange={handleChange} value={data.city} type="text" placeholder='City' />
            <input name='street' onChange={handleChange} type="text" value={data.street} placeholder='Street' />
          </div>

          <div className='multi-fields'>
            <input name='state' onChange={handleChange} value={data.state} type="text" placeholder='State' />
            <input name='zipcode' onChange={handleChange} type="text" value={data.zipcode} placeholder='Zip code' />
          </div>

        </div>

        <div className='place-order-right'>
          
            <div className='cart-total'>

                <h2>Cart Total</h2>

                <div>

                  <div className='cart-total-details'>
                    <p>SubTotal</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>

                  <hr />

                  <div className='cart-total-details'>
                    <p>Delivery Fee</p>
                    <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                  </div>

                  <hr />

                  <div className='cart-total-details'>
                    <p>Total</p> 
                    <p>${getTotalCartAmount() === 0 ? 0 : 2 + getTotalCartAmount() + 2}</p> 
                  </div>

                  <hr />

                </div>

                  <button>proceed to payment</button>

                </div>

        </div>

    </form>
  )
}

export default PlaceOrder