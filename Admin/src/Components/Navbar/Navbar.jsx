import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'    

const Navbar = () => {

  return (
    <div className='navbar'>
    <img className='logo' src={assets.logo} alt='logo'/> 
    <img className='admin_profile' src={assets.admin_profile} alt='admin'/>

    
    </div>
  )
}

export default Navbar