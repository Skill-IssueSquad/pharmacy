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
  const formatAddress = (addressObject) => {
    const parts = [];
  
    if (addressObject.streetName) parts.push(`Street Number: ${addressObject.streetName}`);
    if (addressObject.propertyNumber) parts.push(`Property Number: ${addressObject.propertyNumber}`);
    if (addressObject.floorNumber) parts.push(`Floor Number: ${addressObject.floorNumber}`);
    if (addressObject.apartmentNumber) parts.push(`Apartment Number: ${addressObject.apartmentNumber}`);
    if (addressObject.extraLandmarks) parts.push(`Extra Landmarks: ${addressObject.extraLandmarks}`);
  
    return parts.join(', ');
  };
  
  const handleEditAddressSave = () => {
    const newAddressObject = {
      streetName,
      propertyNumber,
      floorNumber,
      apartmentNumber,
      extraLandmarks,
    };

    // You can use newAddressObject for your logic, and update the state or perform any other actions as needed.


   


    if (
      Object.values(newAddressObject)
        .slice(0, -1) // Exclude the last field (landmark)
        .every((value) => value.trim() !== '') && 
        !addressList.includes(newAddressObject)
    ) {
      setAddressList([...addressList, newAddressObject]);
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
                    {formatAddress(addr)}
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
      label="Street Name"
      variant="outlined"
      value={streetName}
      required
      onChange={(e) => setStreetName(e.target.value)}
      error={streetName.trim() === ''} // Add error state
     
    />
    <TextField
      fullWidth
      label="Property Number"
      variant="outlined"
      value={propertyNumber}
      required
      onChange={(e) => setPropertyNumber(e.target.value)}
      error={propertyNumber.trim() === ''} // Add error state
    />
    <TextField
      fullWidth
      label="Floor Number"
      variant="outlined"
      value={floorNumber}
      required
      onChange={(e) => setFloorNumber(e.target.value)}
      error={floorNumber.trim() === ''} // Add error state
    />
    <TextField
      fullWidth
      label="Apartment Number"
      variant="outlined"
      value={apartmentNumber}
      required
      onChange={(e) => setApartmentNumber(e.target.value)}
      error={apartmentNumber.trim() === ''} // Add error state
    />
    <TextField
      fullWidth
      label="Extra Landmarks"
      variant="outlined"
      value={extraLandmarks}
      onChange={(e) => setExtraLandmarks(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)} color="secondary">
      Cancel
    </Button>
    <Button
      onClick={handleEditAddressSave}
      color="primary"
      disabled={
        !streetName.trim() || !propertyNumber.trim() || !floorNumber.trim() || !apartmentNumber.trim()
      }
    >
      Use once
    </Button>
    <Button
      onClick={handleEditAddressSave}
      color="primary"
      disabled={
        !streetName.trim() || !propertyNumber.trim() || !floorNumber.trim() || !apartmentNumber.trim()
      }
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Container>
  );
};


export default Checkout;