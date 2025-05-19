import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar' 
import './App.css'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import ProductDetails from './Pages/ProductDetails/ProductDetails' 
import LoginPopup from './Pages/LoginPopup'
import Footer from './Components/Footer/Footer'
import Verify from './Pages/Verify/verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [showLogin,setShowLogin]=useState(false)

  return (

    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}

    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      
      <div className='page-layout'>
      <Navbar 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        setShowLogin={setShowLogin}/>

      <div className='page-content'>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/product/:id' element={<ProductDetails />} /> 
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        
      </Routes>
    </div>
    <Footer/>
    </div>
    </div>
    </>
  )
}

export default App
