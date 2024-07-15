import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import { Footer } from './components/footer/Footer'
import Login from './components/login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyOrder from './pages/verifyOrder/VerifyOrder'
import MyOrders from './pages/myOrders/MyOrders'


const App = () => {

  const [showLogin , setShowLogin] = useState(false)


  return (

    <>

    {showLogin && <Login setShowLogin={setShowLogin}/>}

    <div className='app'>
        
        <Router>

        <ToastContainer/>
        
        <Navbar setShowLogin={setShowLogin}/>

          <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/order' element={<PlaceOrder/>}/>
              <Route path='/verify' element={<VerifyOrder/>}/>
              <Route path='/myorders' element={<MyOrders/>}/>

          </Routes>

        </Router>

    </div>

    <Footer/>
    
    </>
  )
}

export default App