import React from 'react'
import "./place-order.css"
import { useStoreContext } from '../../context/StoreContext'



const PlaceOrder = () => {

  const { getTotalCartAmount} = useStoreContext()


  return (
    <form className='place-order'>
        
        <div className='place-order-left'>

          <p className='title'>Delivery Information</p>

          <div className='multi-fields'>
            <input type="text" placeholder='First Name' />
            <input type="text" placeholder='Last Name' />
          </div>

          <input type="email" placeholder='name@example.com' />
          <input type="text" placeholder='+962' />

            <input type="text" placeholder='Country' />

          <div className='multi-fields'>
            <input type="text" placeholder='City' />
          <input type="text" placeholder='Street' />
          </div>

          <div className='multi-fields'>
            <input type="text" placeholder='State' />
            <input type="text" placeholder='Zip code' />
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