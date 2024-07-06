import React from 'react'
import "./navbar.css"
import {assets} from "../../assets/assets"


const Navbar = () => {
  return (
    <div className='navbar'>

        <img src={assets.logo} alt="" className='logo' />

        <ul className='navbar-menu'>
            <li>Home</li>
            <li>Menu</li>
            <li>Mobile-App</li>
            <li>Contact us</li>
        </ul>

        <div className='navbar-right'>

        </div>

    </div>
  )
}

export default Navbar