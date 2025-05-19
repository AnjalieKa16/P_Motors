import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { StoreContext } from '../Context/StoreContext';

const Header = () => {
  const { user } = useContext(StoreContext);

  // Decide what the main CTA should be
  let cta = {
    label: 'Shop Now',
    action: () => {
      const section = document.getElementById('Spare_Part_Display');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    variant: 'contained',
    color: 'primary'
  };

  if (user && (user.role === 'admin' || user.role === 'employee')) {
    cta = {
      label: 'Go to Dashboard',
      action: () => window.location.href = 'http://localhost:5174',
      variant: 'contained',
      color: 'success'
    };
  }

  return (
    <Box
      sx={{
        height: { xs: '50vw', md: '30vw' },
        minHeight: 250,
        position: 'relative',
        background: `url('/backgroundImage1.jpg') no-repeat center`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'fadeIn 4s',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '8%', md: '10%' },
          left: { xs: '5vw', md: '6vw' },
          maxWidth: { xs: '90%', sm: '65%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            color: '#fff',
            fontSize: { xs: '1.5rem', sm: '2.2rem', md: '2.8rem' },
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            mb: 2,
          }}
        >
          Find the Right Part for Every Make and Model
        </Typography>
        <Button
          variant={cta.variant}
          color={cta.color}
          sx={{ borderRadius: 8, fontWeight: 600, width: { xs: '100%', sm: 'auto' } }}
          onClick={cta.action}
        >
          {cta.label}
        </Button>
      </Box>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Header;