import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/SideBar/Sidebar';
import AddProduct from './pages/Product/AddProduct';
import ListPage from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory/Inventory';
import Employees from './pages/Employees/Employees';
import Reports from './pages/Reports/Reports';
import Suppliers from './pages/Suppliers/Suppliers';
import NewSales from './pages/Sales/NewSales';

const App = () => {
  const url = "http://localhost:4000";
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    fetch(`${url}/api/admin/profile`)
      .then(res => res.json())
      .then(data => data.name && setAdminName(data.name))
      .catch(err => console.error("Profile fetch failed", err));
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      <CssBaseline />
      <ToastContainer />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        <Routes>
          <Route path="/" element={<Dashboard url={url} />} />
          <Route path="/AddProduct" element={<AddProduct url={url} />} />
          <Route path="/List" element={<ListPage url={url} />} />
          <Route path="/Orders" element={<Orders url={url} />} />
          <Route path="/Inventory" element={<Inventory url={url} />} />
          <Route path="/Employees" element={<Employees url={url} />} />
          <Route path="/Suppliers" element={<Suppliers url={url} />} />
          <Route path="/Reports" element={<Reports url={url} />} />
          <Route path="/NewSales" element={<NewSales url={url} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
