import React from 'react'
import Navbar from './components/navbar/Navbar'
import SideBar from './components/sidebar/SideBar'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import AddItem from "./pages/addItem/AddItem"
import Orders from "./pages/Orders/Orders"
import List from "./pages/List/List"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>

      <Navbar/>

      <hr />

      <div className='app-content'>

        <SideBar/>

        <Routes>

          <Route path='/add' element={<AddItem/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Orders/>}/>

        </Routes>

      </div>

      <ToastContainer/>
      
    </div>
  )
}

export default App