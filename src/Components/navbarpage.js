import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import Logo from "../Assets/Logo.svg"; // Replace this with the actual path to your logo image

const NavbarPage = ({ title }) => {
    return (
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box display="flex" alignItems="center">
              <img src={Logo} alt="Logo" style={{ height: 40 }} />
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>
                {title}
              </Typography>
            </Box>
            <Box sx={{ width: 60 }}></Box> {/* Placeholder for symmetry */}
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

export default NavbarPage;
