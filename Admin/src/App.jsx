import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/SideBar/sidebar'

import { Route,Routes } from 'react-router-dom'
import AddProduct from './pages/Product/AddProduct'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <Sidebar/>

        <Routes>
          <Route path='/AddProduct' element={<AddProduct/>}/>
          <Route path='/List' element={<List/>}/>
          <Route path='/Orders' element={<Orders/>}/>
          
        </Routes>
      </div>
    
    </div>
  )
}

export default App