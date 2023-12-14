import React, { useState,useEffect } from 'react';
import ResponsiveAppBar from './navBarC'

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
import { Navigate, json, useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useNavigate } from 'react-router-dom';

const MyContext = React.createContext();
const username ="regtest";


const Checkout = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const { data , medicines} = location.state;

   const navigateToOrderDetails = () => {
     navigate('/orderDetails', { state: {} });
   };

  // const cart =()=>{return json.stringify(data)};
  // const medicineInCart=() =>{return json.stringify(medicines)};


  const cartItems = React.useContext(MyContext);
  console.log(cartItems);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pay, setPay] = useState('cash');

  const [newAddress, setNewAddress] = useState('');
  const [total, setTotal] = useState(0);
  const [addressList, setAddressList] = useState([
    
  ]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  //const [newAddress, setNewAddress] = useState('');
  const [streetName, setStreetName] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [extraLandmarks, setExtraLandmarks] = useState('');
  //setIsPlaceOrderDisabled
  const [IsPlaceOrderDisabled, setIsPlaceOrderDisabled] = useState('');
  const medicineNames = useState([]);




  let medicinesA = [];
  for (let i = 0; i < medicines.length; i++) {
    medicinesA.push(medicines[i].medicineName);
  }
const fetchMedicines = async () => {
  try {
    const response = await fetch('http://localhost:8000/getPrescription/getMedicinesFromPharmacy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        medicines:medicinesA
        
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }


  } catch (error) {
    console.error('Error fetching medicines:', error);
  }
};



  const handleCheckout = () => {
    // Your checkout logic here
    alert(`Thank you, ${name}! Your order has been placed to ${selectedAddress}.`);
  };

  const handleEditAddress = () => {
    setOpenEditDialog(true);
  };


  const formatAddress = (addressObject) => {
    const parts = [];
  
    if (addressObject.streetName) parts.push(`Street Name: ${addressObject.streetName}`);
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


  const handleEditAddressSaveInDB = (username) => {
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




addtoDB(username,newAddressObject)







  };

  // const Order = {
  //   username:username,
  //     status: "pending",
  //       date : new Date(),
  //       cart : data,
  //       discount :0 ,
  //       netPrice : total ,
  //       deliveryAddress : selectedAddress
  // }


  const addtoDB = (username,newAddressObject) => fetch('http://localhost:8001/patient/addAddress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      streetName: newAddressObject.streetName,
      propertyNumber: newAddressObject.propertyNumber,
      FloorNumber: newAddressObject.floorNumber,
      ApartmentNumber: newAddressObject.apartmentNumber,
      ExtraLandmarks: newAddressObject.extraLandmarks
    }),

  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      console.log("I am here");
      
    })
    .catch((error) => console.error('Error Deleting medicine from Cart:', error));


const clearCart = (username)=>{
  fetch('http://localhost:8001/patient/clearCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username
    }),

  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      console.log("I am here");
      
    })
    .catch((error) => console.error('Error Deleting medicine from Cart:', error));
}

    const addOrdertoDB = (username) =>{
      fetchMedicines();
      const Order = {
        username:username,
          status: "pending",
            date : new Date(),
            cart : data,
            discount :0 ,
            netPrice : total ,
            deliveryAddress : selectedAddress,
            paymentMethod:pay
      }
    fetch('http://localhost:8001/patient/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username : username,
        status: "pending",
        date : new Date(),
        cart : data,
        discount :0 ,
        netPrice : total ,
        deliveryAddress : selectedAddress,
        paymentMethod:pay

      }),
  
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        console.log("I am here");
        clearCart(username);
        navigateToOrderDetails();
        
      })
      .catch((error) => console.error('Error Deleting medicine from Cart:', error));
  
    };
      





















  //Fetchin userData
 useEffect(()=>{
  const fetchUser=(username)=> fetch('http://localhost:8001/patient/getPatient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      console.log("I am here");
      setName(data.data.name);
      setEmail(data.data.email);
   
    //   for(let i=0;i<data.data.deliveryAddresses.length;i++){
    //   const streetName = data.data.deliveryAddresses[i].streetName;
    //   const propertyNumber = data.data.deliveryAddresses[i].propertyNum;
    //   const floorNumber = data.data.deliveryAddresses[i].floorNum;
    //   const apartmentNumber = data.data.deliveryAddresses[i].apartNum;
    //   const extraLandmarks = data.data.deliveryAddresses[i].extraLandMarks;
      
    //   const newAddressObject = {
    //     streetName,
    //     propertyNumber,
    //     floorNumber,
    //     apartmentNumber,
    //     extraLandmarks,
    //   };
    //   setAddressList([...addressList, newAddressObject]);
    //    console.log(formatAddress(newAddressObject));
    //  // setSelectedAddress(formatAddress(newAddressObject));
    // }

    setAddressList((prevAddresses) => {
      const newAddresses = data.data.deliveryAddresses.map((address) => ({
        streetName: address.streetName,
        propertyNumber: address.propertyNum,
        floorNumber: address.floorNum,
        apartmentNumber: address.apartNum,
        extraLandmarks: address.extraLandMarks,
      }));

      return [...newAddresses];
    });
  //})
      
    })
    .catch((error) => console.error('Error Adding address to patient', error));
   // removeQuantity(id);
   fetchUser(username);

  },[]);





  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0;
  
      // Assuming cart and medicineInCart are state variables
      console.log("cart: "+data.length)
      for (let i = 0; i < data.length; i++) {
        total = total + data[i].quantity * medicines[i].price;
       
      }
      setTotal(total);
      return total;
    };
  
    calculateTotalCost();
  }, [data, medicines]); // Ensure that the dependency array includes all dependencies
  







  useEffect(() => {
    setIsPlaceOrderDisabled(
      !name.trim() ||
      selectedAddress==="" ||
      !email.trim() 
    );
  }, [name,selectedAddress,email]);










  return (
    <div>
      <ResponsiveAppBar/>
    
    <Container maxWidth="md">
      
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              disabled
              
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="address-label">Delivery Address</InputLabel>
              <Select
                labelId="address-label"
                required
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
          
          <Grid  style={{ marginTop: 16 ,marginLeft:18}}>
          <div>
        <input type="radio" id="Payment" name="paymentMethod" value="Cash On Delivery"  checked ={pay ==='cash'}
         onChange={() => setPay('cash')}
        />
        <label for="Payment"> Cash On Delivery</label>
        
        <input type="radio" id="Paymentx" name="paymentMethod" value="Pay Using Stripe" style={{ marginLeft:15}} checked ={pay ==='stripe'}
          onChange={() => setPay('stripe')}

        
        />
        <label for="Paymentx"> Pay using Stripe</label>

      </div>
          </Grid>
        </Grid>
      
        <Button
          variant="contained"
          color="primary"
          disabled={IsPlaceOrderDisabled}

          onClick={()=>addOrdertoDB(username)}
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
  type="number"
  value={propertyNumber}
  required
  onChange={(e) => setPropertyNumber(e.target.value)}
  error={propertyNumber.trim() === ''}
/>

<TextField
  fullWidth
  label="Floor Number"
  variant="outlined"
  type="number"
  value={floorNumber}
  required
  onChange={(e) => setFloorNumber(e.target.value)}
  error={floorNumber.trim() === ''}
/>

<TextField
  fullWidth
  label="Apartment Number"
  variant="outlined"
  type="number"
  value={apartmentNumber}
  required
  onChange={(e) => setApartmentNumber(e.target.value)}
  error={apartmentNumber.trim() === ''}
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
      onClick={()=>handleEditAddressSaveInDB(username)}
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
    </div>
  );
};


export default Checkout;