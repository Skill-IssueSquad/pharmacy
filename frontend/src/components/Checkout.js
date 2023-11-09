import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
const MyContext = React.createContext();


const Checkout = () => {
  const cartItems = React.useContext(MyContext);
  console.log(cartItems);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newAddress, setNewAddress] = useState('');
  //const [total, setTotal] = useState(0);
  const [addressList, setAddressList] = useState([
    '123 Main St, City',
    '456 Elm St, Town',
    // Add more predefined addresses
  ]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  //const [newAddress, setNewAddress] = useState('');
  const [streetName, setStreetName] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [extraLandmarks, setExtraLandmarks] = useState('');

  const handleCheckout = () => {
    // Your checkout logic here
    alert(`Thank you, ${name}! Your order has been placed to ${selectedAddress}.`);
  };

  const handleEditAddress = () => {
    setOpenEditDialog(true);
  };

  const total = () =>{

  }

  
  const handleEditAddressSave = () => {
    const newAddressObject = {
      streetName,
      propertyNumber,
      floorNumber,
      apartmentNumber,
      extraLandmarks,
    };

    // You can use newAddressObject for your logic, and update the state or perform any other actions as needed.

    if (Object.values(newAddressObject).some(value => value.trim() !== '')) {
      setAddressList([...addressList, newAddressObject]);
      setSelectedAddress(newAddressObject);
    }

    // Clear the input fields after saving
    setStreetName('');
    setPropertyNumber('');
    setFloorNumber('');
    setApartmentNumber('');
    setExtraLandmarks('');

    setOpenEditDialog(false);
  };

  const location = useLocation();
  const { data , medicines} = location.state;

  return (
    <Container maxWidth="md">
        <p>Received data: {JSON.stringify(data)}</p>
        <p>Received data: {JSON.stringify(medicines)}</p>

      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="address-label">Delivery Address</InputLabel>
              <Select
                labelId="address-label"
                id="address"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                {addressList.map((addr, index) => (
                  <MenuItem key={index} value={addr}>
                    {addr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditAddress}
              style={{ marginTop: 16 }}
            >
              Edit Address
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Amount"
              variant="outlined"
              value={total}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          style={{ marginTop: 16 }}
        >
          Place Order
        </Button>
      </form>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit/Add Address</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="street name"
            variant="outlined"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
            <TextField
            fullWidth
            label="property number"
            variant="outlined"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="floor number"
            variant="outlined"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="apartment num"
            variant="outlined"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="Extra landmarks"
            variant="outlined"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditAddressSave} color="primary">
            Use once
          </Button>
          <Button onClick={handleEditAddressSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};


export default Checkout;