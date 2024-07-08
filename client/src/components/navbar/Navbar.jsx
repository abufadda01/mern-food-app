import React, { useState } from 'react'
import "./navbar.css"
import {assets} from "../../assets/assets"
import { Link } from 'react-router-dom'



const Navbar = ({setShowLogin}) => {

    const [menu , setMenu] = useState("home")

  return (
    <nav className='navbar'>

        <img src={assets.logo} alt="logo" className='logo' />

        <ul className='navbar-menu'>
            <Link to={"/"} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href='#explore-menu'  onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
            <a onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
            <a href='#footer'  onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
        </ul>

        <div className='navbar-right'>

            <img src={assets.search_icon} alt="search-icon" />

            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="basket-icon" />
                <div className='dot'></div>
            </div>

            <button onClick={() => setShowLogin(true)}>sign in</button>

        </div>

    </nav>
  )
}

export default Navbar