import React, { useState } from 'react'
import "./login.css"
import { assets } from '../../assets/assets'


const Login = ({setShowLogin}) => {

    const [currentPage , setCurrentPage] = useState("register")
    
  return (
    <div className='login'>

        <form className='login-container'>

            <div className='login-title'>
                <h2>{currentPage}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className='login-inputs'>
                {currentPage !== "Login" && <input type="text" placeholder='your name' required />}
                <input type="email" placeholder='name@example.com' required />
                <input type="password" placeholder='********' required />
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
                    <p>Already have an account ? <span onClick={() => setCurrentPage("Login")}>Login</span> </p> 
                </> 
                : 
                <> 
                    <p>Create a new account ? <span onClick={() => setCurrentPage("register")}>register here</span> </p> 
                </>
            }
            
        </form>

    </div>
  )
}


export default Login