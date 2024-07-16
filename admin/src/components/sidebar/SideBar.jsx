import React, { useState } from 'react'
import "./sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const SideBar = () => {

    const [menu , setMenu] = useState("home")

  return (
    <div className='sidebar'>

        <div className='sidebar-options'>
    
            <NavLink onClick={() => setMenu("add")} to="/add" className={`sidebar-option ${menu === "add" ? "active" : ""}`}>
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>

            <NavLink onClick={() => setMenu("list")} to="/list" className={`sidebar-option ${menu === "list" ? "active" : ""}`}>
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>

            <NavLink onClick={() => setMenu("orders")} to="/" className={`sidebar-option ${menu === "orders" ? "active" : ""}`}>
                <img src={assets.add_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        
        </div>
    
    </div>
  )
}

export default SideBar