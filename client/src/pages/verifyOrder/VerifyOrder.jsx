import React, { useEffect } from 'react'
import "./verifyOrder.css"
import { useSearchParams , useNavigate } from 'react-router-dom'
import { axiosObj } from '../../utils/axios'
import { useStoreContext } from '../../context/StoreContext'


const VerifyOrder = () => {

    // to get the queries key values from the current page url
    const [searchParams ,  setSearchParams] = useSearchParams()
    const {token} = useStoreContext()

    const navigate = useNavigate()

    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    
    const verifyPayment = async () => {

        try {
        
            const response = await axiosObj.post("/order/verify" , {success , orderId} , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })

            if(response.data.success){
                navigate("/myorders")
            }else{
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }
    }   


    useEffect(() => {
        verifyPayment()
    } , [])



  return (
    <div className='verify'>
        <div className='spinner'></div>
    </div>
  )
}


export default VerifyOrder