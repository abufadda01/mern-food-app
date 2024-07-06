import React from 'react'
import Navbar from './components/navbar/Navbar'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'


const App = () => {
  return (
    <div className='app'>
        
        <Navbar/>

        <Router>

          <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/order' element={<PlaceOrder/>}/>

          </Routes>

        </Router>

    </div>
  )
}

export default App