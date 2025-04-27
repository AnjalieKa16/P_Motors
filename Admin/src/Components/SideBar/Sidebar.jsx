import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const sidebar = () => {
  return (
    <div className='Sidebar'>
        <div className='Sidebar-options'>
        
            <NavLink to='/AddProduct' className='Sidebar-option'>
                <img className='addIcon' src={assets.addIcon} alt='addIcon'/>
                <p>Add Items</p>
            </NavLink>

            <NavLink to='/List' className='Sidebar-option'>
                <img className='orderIcon' src={assets.parsel} alt='addIcon'/>
                <p>List Items</p>
            </NavLink>

            <NavLink to='./Orders' className='Sidebar-option'>
                <img className='orderIcon' src={assets.parsel} alt='addIcon'/>
                <p>Orders</p>
            </NavLink>

        </div>
    </div>
  )
}

export default sidebar