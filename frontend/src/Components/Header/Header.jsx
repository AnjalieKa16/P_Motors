import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
    
    <header className="header" id="Header">
      <div className="header-contents">
        <h2>Find the Right Part for Every Make and Model</h2>

        <div className="button-group">
          <Link to="/login" className="btn btn-primary mx-2">Login</Link>
          <Link to="/register" className="btn btn-outline-light mx-2">Register</Link>
        </div>

      </div>
    </header>

    </div>
  )
}

export default Header