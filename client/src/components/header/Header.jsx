import React from 'react'
import "./header.css"


const Header = () => {
  return (
    <header id='#header' className='header'>
        <div className='header-contents'>
            <h2>Order Your Favorite Food Here</h2>
            <p>Food App is your ultimate destination for delicious and convenient dining experiences. With a vast selection of restaurants and cuisines, our platform allows you to browse menus, place orders, and enjoy your favorite meals delivered right to your doorstep</p>
            <button>view menu</button>
        </div>
    </header>
  )
}

export default Header