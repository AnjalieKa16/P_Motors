/*import React from 'react'
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
*/

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, Typography, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';

import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import HistoryIcon from '@mui/icons-material/History';


const drawerWidth = 220;

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
    { text: 'Add Product', icon: <AddBoxIcon />, path: '/AddProduct' },
    { text: 'Product List', icon: <ListAltIcon />, path: '/List' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/Orders' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/Inventory' },
    { text: 'Employees', icon: <PeopleIcon />, path: '/Employees' },
    { text: 'Suppliers', icon: <PeopleIcon />, path: '/Suppliers' },
    { text: 'Reports', icon: <BarChartIcon />, path: '/Reports' }
  ];

  const salesMenuItems = [
    { text: 'New Sale (POS)', icon: <PointOfSaleIcon />, path: '/NewSales' },
    //{ text: 'Orders', icon: <ShoppingCartIcon />, path: '/Orders' },
    { text: 'Sales History', icon: <HistoryIcon />, path: '/sales-history' },
   // { text: 'Returns / Refunds', icon: <RefundIcon />, path: '/returns' },
    //{ text: 'Sales Reports', icon: <BarChartIcon />, path: '/sales-reports' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: '#222e3c',
          color: '#fff',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map(item => (
            <ListItem
              button
              key={item.text}
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': { backgroundColor: '#1b2430' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          <Divider sx={{ bgcolor: '#444', my: 1 }} />

          {/* Sales section header */}
          <Typography variant="subtitle2" sx={{ pl: 2, pt: 1, color: '#aaa' }}>
            Sales
          </Typography>

          {/* Sales menu items */}
          {salesMenuItems.map(item => (
            <ListItem
              button
              key={item.text}
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': { backgroundColor: '#1b2430' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}


        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
