import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pharmacy App
          </Typography>
          <Button component={Link} to="/pharmacist/medicines" color="inherit">
            Medicines
          </Button>
          <Button
            component={Link}
            to="/pharmacist/medicines/sales"
            color="inherit"
          >
            Sales
          </Button>
          <Button
            component={Link}
            to="/pharmacist/medicines/addmedicine"
            color="inherit"
          >
            AddMedicine
          </Button>
         
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;