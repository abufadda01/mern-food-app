import React, { useEffect, useState } from 'react'
import "./myorders.css"
import { useStoreContext } from '../../context/StoreContext'
import { axiosObj } from '../../utils/axios'
import { assets } from '../../assets/assets'


const MyOrders = () => {

    const { token } = useStoreContext()
    const [userOrders , setUserOrders] = useState([])
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);


    const getUserOrders = async (e) => {

        try {
            const response = await axiosObj.get(`/order?page=${page}` , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })

            setUserOrders(response.data.userOrders)
            setTotalPages(response.data.totalPages)
        
        } catch (error) {
            console.log(error)    
        }
    }


    useEffect(() => {
        getUserOrders()
    } , [page , token])



  return (
    <div className='my-orders'>

        <h2>My Orders</h2>

        <div className="container">
            
            {userOrders.map((order) => (

                <div key={order?._id} className='my-orders-order'>

                    <img src={assets.parcel_icon} alt="" />

                        <p>
                            {order.items.map((item , index) => {
                                if(index === order.items.length - 1){
                                    // get the last item name in the order items array
                                    return item.name + " x "  + item.quantity
                                }else{
                                    return item.name + " x "  + item.quantity + ", "                                    
                                }
                            })}

                        </p>

                        <p>${order.amount}.00 💸</p>
                        <p>num of items : {order.items.length}</p>
                        <p><span>🚚 {order.status}</span></p>

                        <button>Track Order</button>

                    </div>

            ))}

        </div>

    </div>
  )
}

export default MyOrders