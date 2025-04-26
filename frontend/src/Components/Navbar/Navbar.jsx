import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { useContext } from 'react';

const Navbar = ({ toggleDarkMode, darkMode,setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const navigate = useNavigate(); 

  const {getTotalPrice} = useContext(StoreContext)



  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logosparep} alt='Logo' className='logo' /></Link>

      <ul className='navbar-list'>
        <Link to='' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#exploreCategory' onClick={() => setMenu("Products")} className={menu === "Products" ? "active" : ""}>Products</a>
        <a href='#footer' onClick={() => setMenu("About-Us")} className={menu === "About-Us" ? "active" : ""}>About Us</a>
      </ul>

      <div className='navbar-right'>
        <img src={assets.search_line} alt='Search Icon' className='search-icon' />

        <div className='navbar-basket-icon' onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
          <img src={assets.shoppingCart} alt='basket icon' className='basket-icon' />
          <div className={getTotalPrice()===0?"":'dot'}></div>
        </div>

        <button className='sign-in-button' onClick={()=> setShowLogin(true)}>Sign In</button>

        {/* Toggle Button */}
        <button onClick={toggleDarkMode} className='mode-toggle'>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
