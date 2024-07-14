import React, { useEffect, useState } from 'react'
import "./login.css"
import { assets } from '../../assets/assets'
import { axiosObj } from '../../utils/axios'
import { useStoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify';


const Login = ({setShowLogin}) => {

    const [currentPage , setCurrentPage] = useState("Login")
    const {setToken} = useStoreContext()

    const [formData , setFormData] = useState({
        name : "" ,
        email : "" ,
        password : ""
    })

    const handleChange = e => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }
    

    const handleSubmit = async (e) => {

        e.preventDefault()

        let url = `http://localhost:5000/api/user`

        try {
            
            if(currentPage === "Login"){
                url += `/login`
                const response = await axiosObj.post(url , formData)
                setToken(response.data.token)
                localStorage.setItem("token" , response.data.token)
                setShowLogin(false)
                toast.info(`Welcome Back ${response.data.user.name}`)
            }else{
                url += `/register`
                await axiosObj.post(url , formData)
                setCurrentPage("Login")
            }

        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }




  return (
    <div className='login'>

        <form onSubmit={handleSubmit} className='login-container'>

            <div className='login-title'>
                <h2>{currentPage}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className='login-inputs'>
                {currentPage !== "Login" && <input onChange={handleChange} name='name' type="text" placeholder='your name' required />}
                <input type="email" name="email" onChange={handleChange} placeholder='name@example.com' required />
                <input type="password" onChange={handleChange} name='password' placeholder='********' required />
            </div>

            <button>{currentPage === "register" ? "Create Account" : "Login"}</button>

            <div className='login-conditions'>
                <input type="checkbox" required />
                <p>i agree to the terms of use & privacy policy</p>
            </div>

            {
                currentPage === "register" 
                ? 
                <> 
                    <p>Already have an account ? <span onClick={() => {setCurrentPage("Login") ; setFormData({name : "" , email : "" , password : ""})}}>Login</span> </p> 
                </> 
                : 
                <> 
                    <p>Create a new account ? <span onClick={() => {setCurrentPage("register"); setFormData({name : "" , email : "" , password : ""})}}>register here</span> </p> 
                </>
            }
            
        </form>

    </div>
  )
}


export default Login