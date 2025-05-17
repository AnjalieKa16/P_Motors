import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { useContext } from 'react';

const Navbar = ({ toggleDarkMode, darkMode,setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const navigate = useNavigate(); 

  const {getTotalPrice,token,setToken} = useContext(StoreContext)

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    navigate('/');
  }

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

        {!token?<button className='sign-in-button' onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt='profile icon' className='profile-icon' />
          <ul className='navbar-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_shopping} alt='bag_shopping' className='bag_shopping'/><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon} alt='logout_icon' className='logout_icon'/><p>Logout</p></li>
          </ul>

        </div>}
       {/*<button className='sign-in-button' onClick={()=> setShowLogin(true)}>Sign In</button>*/} 

        {/* Toggle Button */}
        <button onClick={toggleDarkMode} className='mode-toggle'>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
