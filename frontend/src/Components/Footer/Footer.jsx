import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
     /* 
  return (
  
    <div className='footer' id='footer'>
        <div className='footer-content'>

            <div className='footer-content-left'>
            <img src={assets.logosparep} alt=''/>
            <p>Prasad Mortors.lk is an online Car Accessories, Car Care and Auto Parts Store in Sri Lanka. With aim to provide the highest quality branded and imported products to Car enthusiasts in Sri Lanka.</p>

                <div className='footer-social-icons'>
                    <img src={assets.facebookIcon2} />
                </div>

            </div>

            <div className='footer-content-center'>
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>

            <div className='footer-content-right'>
                <h2> Get In Touch</h2>
                <ul>
                    <li>+94 774502587</li>
                    <li>example@gmail.com</li>
                </ul>
            </div>
        </div>

        <hr/>
        <p className='footer-copyright'>2025 Prasad Motors. All rights reserved.</p>
    </div>
    

  )*/

    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-column">
          <h3>About</h3>
          <p>
            Prasad Motors.lk is an online Car Accessories, Car Care and Auto Parts Store in Sri Lanka.
            We aim to provide the highest quality branded and imported products to car enthusiasts.
          </p>
          <div className="payment-icons">
            <img src={assets.visa} alt="Visa" />
            <img src={assets.mastercard} alt="Mastercard" />
            <img src={assets.paypal} alt="Paypal" />
          </div>
          <p className="secure-text">Secure online payment.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>
          
          <div className="contact-Address">
          <p><img src={assets.location} alt="Location" className="icon" /> 123, Colombo, Sri Lanka</p>
          </div>
          
          <p><span className="bold">Phone:</span> +94 774502587</p>
          <p><span className="bold">Email:</span> prasadmortorskirindwela@gmail.com</p>
        </div>

        {/* Social Icons */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><img src={assets.facebook} alt="Facebook" /></a>
            {/* Add more icons as needed */}
          </div>
        </div>
      </div>

      <hr />
      <div className="footer-bottom">
        <p>Copyright © {currentYear} Prasad Motors. All rights reserved.</p>
      </div>
    </footer>
  );
};






export default Footer