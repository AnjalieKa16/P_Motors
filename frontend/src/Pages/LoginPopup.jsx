import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const[currState,setCurrState] =useState("Login")

  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}  alt="" className='cross-icon'></img>
            </div>

            <div className='login-popup-inputs'>
                {currState==="Login"?<></>:<input type="text" placeholder='Your Name' required></input>}
                <input type="email" placeholder='Your Email' required></input>
                <input type="password" placeholder='Your Password' required></input>
            </div>

            <button className='login-popup-button'>{currState==="Sign Up"?"Create account":"Login"}</button>
            
                <div className='login-popup-conditions'>
                    <input type='checkbox' required></input>
                    <p>I agree to the <span>Terms and Conditions</span></p>
                </div>

                {currState==="Login"
                ?<p> create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span> </p>
                :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span> </p>}

                
                

        </form>

    </div>
  )
}

export default LoginPopup