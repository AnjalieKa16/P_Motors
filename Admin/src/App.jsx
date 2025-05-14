import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/SideBar/Sidebar'

import { Route,Routes } from 'react-router-dom'
import AddProduct from './pages/Product/AddProduct'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <Sidebar/> 

        <Routes>
          <Route path='/AddProduct' element={<AddProduct url={url}/>}/>
          <Route path='/List' element={<List url={url}/>}/>
          <Route path='/Orders' element={<Orders url={url}/>}/>
          
        </Routes>
      </div>
    
    </div>
  )
}

export default App