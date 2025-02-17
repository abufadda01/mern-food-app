import React from 'react'
import "./cart.css"
import { useStoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { Link , useNavigate } from 'react-router-dom'


const Cart = () => {

  const { food_list , cartItems , removeFromCart , getTotalCartAmount ,  foodList} = useStoreContext()

  const navigate = useNavigate()


  return (
    <div className='cart'>

      <div className='cart-items'>
      
        <div className='cart-items-title'>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>

        <br />
        <hr />


        {foodList?.map((item , index) => {

          if(cartItems[item?._id]){

            return (
              <div key={item?._id}>

                <div className='cart-items-title cart-items-item'>
                    <img src={`http://localhost:5000/images/${item?.image}`} alt="" />
                    <p>{item?.name}</p>
                    <p>${item?.price}</p>
                    {/* item quantity */}
                    <p>{cartItems[item?._id]}</p> 
                    <p>${item?.price * cartItems[item?._id]}</p>
                    <img onClick={() => removeFromCart(item?._id)} className='remove-icon' src={assets.remove_icon_red} alt="" /> 
                </div>

                <hr />

              </div>
            )

          }

        })}

      </div>
      

      <div className='cart-bottom'>

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

              <button onClick={() => navigate("/order")}>proceed to checkout</button>

          </div>

          <div className='cart-promo-code'>
              
              <div>
                
                <p>if you have a promo code , Enter it here</p>
                
                <div className='cart-promocode-input'>
                  <input type="text" placeholder='Promo Code' name="" id="" />
                  <button>Submit</button>
                </div>

              </div>
          
          </div>

      </div>

    </div>
  )
}

export default Cart