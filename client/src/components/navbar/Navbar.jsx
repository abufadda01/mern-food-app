import React, { useState } from 'react'
import "./navbar.css"
import {assets} from "../../assets/assets"
import { Link } from 'react-router-dom'
import { useStoreContext } from '../../context/StoreContext'



const Navbar = ({setShowLogin}) => {

    const [menu , setMenu] = useState("home")
    const {getTotalCartAmount} = useStoreContext()


  return (
    <nav className='navbar'>

        <Link to={"/"}>
            <img src={assets.logo} alt="logo" className='logo' />
        </Link>

        <ul className='navbar-menu'>
            <Link to={"/"} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href='#explore-menu'  onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
            <Link to={"/cart"} onClick={() => setMenu("cart")} className={menu === "cart" ? "active" : ""}>Cart</Link>
            <a href='#footer'  onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
        </ul>

        <div className='navbar-right'>

            <img src={assets.search_icon} alt="search-icon" />

            <div className="navbar-search-icon">
                
                <Link to="/cart">
                    <img src={assets.basket_icon} alt="basket-icon" />
                </Link>
                
                <div className={getTotalCartAmount() === 0 ? "" : 'dot'}></div>
            
            </div>

            <button onClick={() => setShowLogin(true)}>sign in</button>

        </div>

    </nav>
  )
}

export default Navbar