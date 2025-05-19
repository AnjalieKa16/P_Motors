import React, { useState, useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Avatar, Badge, Divider, Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({ toggleDarkMode, darkMode, setShowLogin }) => {
  const [anchorEl, setAnchorEl] = useState(null); // For mobile menu
  const [profileAnchor, setProfileAnchor] = useState(null); // For profile dropdown
  const navigate = useNavigate();

  const { getTotalPrice, token, setToken, user } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken("");
    navigate('/');
  };

  // Mobile menu handlers
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Profile dropdown handlers
  const handleProfileMenu = (event) => setProfileAnchor(event.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);

  // Dashboard navigation for staff
  const goToDashboard = () => {
    if (user?.role === 'admin') navigate('/admin');
    else if (user?.role === 'employee') navigate('/employee');
    handleProfileClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(34,46,60,0.85)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        boxShadow: '0 4px 24px rgba(34,46,60,0.13)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 60, md: 80 }, px: { xs: 1, md: 4 } }}>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/">
            <img
              src={assets.logosparep}
              alt="Logo"
              style={{
                height: 48,
                borderRadius: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                background: '#fff',
                padding: 4,
              }}
            />
          </Link>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              letterSpacing: 2,
              ml: 1,
              transition: 'color 0.2s',
              '&:hover': { color: '#ffc107' }
            }}
          >
            Motors Shop
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/" color="inherit" sx={{
            fontWeight: 600, px: 2, borderRadius: 8, fontFamily: 'Georgia, serif', letterSpacing: 1
          }}>Home</Button>
          <Button component="a" href="#exploreCategory" color="inherit" sx={{
            fontWeight: 600, px: 2, borderRadius: 8, fontFamily: 'Georgia, serif', letterSpacing: 1
          }}>Products</Button>
          <Button component="a" href="#footer" color="inherit" sx={{
            fontWeight: 600, px: 2, borderRadius: 8, fontFamily: 'Georgia, serif', letterSpacing: 1
          }}>About Us</Button>
          <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{
            mx: 1, borderRadius: 8, background: 'rgba(255,255,255,0.08)', '&:hover': { background: '#ffc10722' }
          }}>
            <Badge badgeContent={getTotalPrice() > 0 ? getTotalPrice() : null} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" sx={{
            mx: 1, borderRadius: 8, background: 'rgba(255,255,255,0.08)', '&:hover': { background: '#ffc10722' }
          }}>
            <SearchIcon />
          </IconButton>
          <Button
            onClick={toggleDarkMode}
            color="inherit"
            sx={{
              fontSize: 22,
              minWidth: 0,
              mx: 1,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.10)',
              '&:hover': { background: '#ffc10722' }
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </Button>
          {!token ? (
            <Button
              variant="contained"
              color="warning"
              sx={{
                fontWeight: 700,
                borderRadius: 8,
                ml: 2,
                px: 3,
                boxShadow: '0 2px 12px rgba(255,193,7,0.10)',
                fontFamily: 'Georgia, serif',
                letterSpacing: 1
              }}
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </Button>
          ) : (
            <Box>
              <IconButton onClick={handleProfileMenu} color="inherit" sx={{
                ml: 1, borderRadius: 8, background: 'rgba(255,255,255,0.10)', '&:hover': { background: '#ffc10722' }
              }}>
                <Avatar src={assets.profile_icon} alt="profile" sx={{ width: 38, height: 38, bgcolor: '#fff' }} />
              </IconButton>
              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={handleProfileClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    minWidth: 220,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(34,46,60,0.18)',
                    background: 'rgba(255,255,255,0.97)',
                    color: '#222e3c',
                  }
                }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleProfileClose(); }}>
                  <Avatar src={assets.profile_icon} sx={{ width: 24, height: 24, mr: 1 }} />
                  <span style={{ fontWeight: 600 }}>
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.email}
                  </span>
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                {(user?.role === 'admin' || user?.role === 'employee') && (
                  <MenuItem onClick={goToDashboard}>
                    <DashboardIcon sx={{ color: '#1976d2', mr: 1 }} />
                    Go to Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={() => { navigate('/myorders'); handleProfileClose(); }}>
                  <ListAltIcon sx={{ color: '#1976d2', mr: 1 }} />
                  Orders
                </MenuItem>
                <MenuItem onClick={() => { navigate('/profile/edit'); handleProfileClose(); }}>
                  <EditIcon sx={{ color: '#1976d2', mr: 1 }} />
                  Edit Profile
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={() => { logout(); handleProfileClose(); }}>
                  <LogoutIcon sx={{ color: '#d32f2f', mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleMenu} sx={{
            borderRadius: 8, background: 'rgba(255,255,255,0.10)', '&:hover': { background: '#ffc10722' }
          }}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                minWidth: 180,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(34,46,60,0.18)',
                background: 'rgba(255,255,255,0.97)',
                color: '#222e3c',
              }
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
            <MenuItem component="a" href="#exploreCategory" onClick={handleClose}>Products</MenuItem>
            <MenuItem component="a" href="#footer" onClick={handleClose}>About Us</MenuItem>
            <MenuItem onClick={() => { navigate('/cart'); handleClose(); }}>
              <ShoppingCartIcon sx={{ mr: 1 }} /> Cart
            </MenuItem>
            {!token ? (
              <MenuItem onClick={() => { setShowLogin(true); handleClose(); }}>
                Sign In
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  Profile
                </MenuItem>
                {(user?.role === 'admin' || user?.role === 'employee') && (
                  <MenuItem onClick={() => { goToDashboard(); handleClose(); }}>
                    <DashboardIcon sx={{ color: '#1976d2', mr: 1 }} />
                    Go to Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={() => { navigate('/myorders'); handleClose(); }}>
                  <ListAltIcon sx={{ color: '#1976d2', mr: 1 }} />
                  Orders
                </MenuItem>
                <MenuItem onClick={() => { navigate('/profile/edit'); handleClose(); }}>
                  <EditIcon sx={{ color: '#1976d2', mr: 1 }} />
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={() => { logout(); handleClose(); }}>
                  <LogoutIcon sx={{ color: '#d32f2f', mr: 1 }} />
                  Logout
                </MenuItem>
              </>
            )}
            <MenuItem>
              <Button onClick={toggleDarkMode} color="inherit" sx={{
                fontSize: 20, minWidth: 0, borderRadius: 8, background: 'rgba(255,255,255,0.10)', '&:hover': { background: '#ffc10722' }
              }}>
                {darkMode ? '☀️' : '🌙'}
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;