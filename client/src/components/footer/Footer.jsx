import React from 'react'
import "./footer.css"
import { assets } from '../../assets/assets'


export const Footer = () => {
  return (
    <div className='footer' id='footer'>

        <div className="footer-content">
        
            <div className="footer-content-left">

                <img src={assets.logo} alt="" />

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Ipsam, illo facere eaque pariatur quisquam laudantium numquam deserunt et. Illum, ipsum?</p>

                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>

                <div>

                </div>

            </div>
        
            <div className="footer-content-center">

                <h2>Company</h2>

                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            
            <div className="footer-content-right">
                
            <h2>Get in touch</h2>

            <ul>
                <li>+962 771101109</li>
                <li>contact@tomato.info</li>
            </ul>

            </div>
        
        </div>

        <hr />

        <p className='footer-copyright'>Copyright 2024 &copy; Tomato.com</p>

    </div>
  )
}
