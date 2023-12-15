import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';


const Navbar = () => {


const username ="fewf";

const [walletBalance, setWalletBalance] = useState(0);


const getWalletBalance = (username) => {
  fetch('http://localhost:8001/pharmacist/medicines/getWalletBalance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Return the JSON response
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      console.log(data.data.walletBalance);
      //walletBalance = data.data.walletBalance;

      setWalletBalance(data.data);
    })
    .catch((error) => console.error('Error fetching wallet balance:', error));
};

getWalletBalance(username);
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
          <Box>
          <Button
            component={Link}
            to="/pharmacist/medicines/salesreport"
            color="inherit"
          >
            Sales Report
          </Button>

          <Button
            component={Link}
            to="/pharmacist/medicines/monthlysalesreport"
            color="inherit"
          >
            Monthly Sales Report
          </Button>



          <Button
            component={Link}
            to="/pharmacist/medicines/addmedicine"
            color="inherit"
          >
            AddMedicine
          </Button>
          </Box>
          <Box >
            <div style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <Typography variant="body1" style={{ marginTop: '10px', marginRight: '10px' }}>
              Wallet Balance: {walletBalance}
            </Typography>
        </div>
          </Box>
         
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
