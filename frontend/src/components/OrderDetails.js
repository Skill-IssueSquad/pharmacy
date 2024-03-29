import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from './navBarC'

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { json } from 'react-router-dom';
import { MDBCard } from 'mdb-react-ui-kit';

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const username = localStorage.getItem('username');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8001/patient/getPatient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
  
        if (data.data.orders && data.data.orders.length > 0) {
          const fetchedOrders = data.data.orders.map((fetchedOrder) => ({
            id: fetchedOrder._id,
            status: fetchedOrder.status,
            date: fetchedOrder.date,
            cart: {
              medicines: fetchedOrder.cart.medicines.map((medicine) => ({
                medicine_id: medicine.medicine_id,
                quantity: medicine.quantity,
              })),
              totalPrice: fetchedOrder.cart.totalPrice,
              discount: fetchedOrder.cart.discount,
              netPrice: fetchedOrder.cart.netPrice,
            },
            discount: fetchedOrder.discount,
            netPrice: fetchedOrder.netPrice,
            deliveryAddress: {
              streetName: fetchedOrder.deliveryAddress ? fetchedOrder.deliveryAddress.streetName : '',
              propertyNumber: fetchedOrder.deliveryAddress ? fetchedOrder.deliveryAddress.propertyNum : '',
              floorNumber: fetchedOrder.deliveryAddress ? fetchedOrder.deliveryAddress.floorNum : '',
              apartmentNumber: fetchedOrder.deliveryAddress ? fetchedOrder.deliveryAddress.apartNum : '',
              extraLandmarks: fetchedOrder.deliveryAddress ? fetchedOrder.deliveryAddress.extraLandMarks : '',
            },
          }));
  
          setOrder(fetchedOrders);
          setSelectedOrder(fetchedOrders[fetchedOrders.length - 1]);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
  
    const fetchData = async () => {
      try {
        await Promise.race([fetchUser(), new Promise(resolve => setTimeout(resolve, 10000))]);
      } catch (error) {
        console.error('Request timed out or failed. Proceeding without data.');
      }
    };
  
    // Call the fetchData function
    fetchData();
  }, [username]);
  
  

  useEffect(() => {
    const fetchMedicines = async (orderData) => {
      const allMedicines = [];

      for (const orderItem of orderData) {
        const cartItems = orderItem.cart.medicines.map((medicine) => ({ medicine_id: medicine.medicine_id }));

        try {
          const response = await fetch('http://localhost:8001/medicine/getArrayMedicinesByID', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartItems }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const medicineOutputs = await response.json();
          allMedicines.push(medicineOutputs);
        } catch (error) {
          console.error('Error fetching medicines:', error);
        }
      }

      setMedicines(allMedicines);
    };

    if (order.length > 0) {
      fetchMedicines(order);
    }
  }, [order]);

  const formatAddress = (addressObject) => {
    const parts = [];
    if (addressObject.propertyNumber) parts.push(`Street Name: ${addressObject.streetName}`);
    if (addressObject.propertyNumber) parts.push(`Property Number: ${addressObject.propertyNumber}`);
    if (addressObject.floorNumber) parts.push(`Floor Number: ${addressObject.floorNumber}`);
    if (addressObject.apartmentNumber) parts.push(`Apartment Number: ${addressObject.apartmentNumber}`);
    if (addressObject.extraLandmarks) parts.push(`Extra Landmarks: ${addressObject.extraLandmarks}`);

    return parts.join(', ');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleOrderChange = (event) => {
    const orderId = event.target.value;
    const selected = order.find((orderItem) => orderItem.id === orderId);
    setSelectedOrder(selected);
  };

  const DeleteOrder = async () => {
    console.log("omar")
    if (selectedOrder) {
      try {
        const response = await fetch('http://localhost:8001/patient/deleteOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            orderID: selectedOrder.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  // if (!medicines || medicines.length === 0) {
  //   return <p>Loading Orders...</p>;
  // }
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>
          Loading...
        </Typography>
      </div>
    );
  }else{
  return (
    <div>
      <ResponsiveAppBar button={"Orders"}/>
      <Typography variant="h4" align="center" gutterBottom style={{marginTop: '20px'}}>
        Order Details
      </Typography>
      <MDBCard style={{width:540, height:500, left:'450px', top: '20px'}}>
        <Typography variant="h6" gutterBottom style={{marginLeft: '20px', marginTop:'20px'}}>
          Order Information
        </Typography>
        <FormControl style={{ marginBottom: 20,marginLeft:'20px', width: 500 }}>
          <InputLabel id="order-select-label">Select Order</InputLabel>
          <Select
            labelId="order-select-label"
            id="order-select"
            value={selectedOrder ? selectedOrder.id : ''}
            onChange={handleOrderChange}
          >
            {order.map((orderItem) => (
              <MenuItem key={orderItem.id} value={orderItem.id}>
                Order {orderItem.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TableContainer component={Paper} style={{width:480,  marginLeft:'30px',backgroundColor: "#f0f0f0", }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Net Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.map((orderItem, index) => (
                <TableRow key={index}>
                  {orderItem.id === selectedOrder?.id ? (
                    <>
                      <TableCell>{orderItem.id}</TableCell>
                      <TableCell>{orderItem.status}</TableCell>
                      <TableCell>{formatDate(orderItem.date)}</TableCell>
                      <TableCell>{orderItem.discount}</TableCell>
                      <TableCell>{orderItem.netPrice}</TableCell>
                      <TableCell><button  disabled={orderItem.status === "cancelled"} onClick={DeleteOrder}>Cancel Order</button></TableCell>
                    </>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" style={{ marginTop: 20, marginLeft:'20px' }} gutterBottom>
          Delivery Address
        </Typography>
        {selectedOrder && (
          <Typography>
            {formatAddress(selectedOrder.deliveryAddress)}
          </Typography>
        )}
        <Typography variant="h6" style={{ marginTop: 20,  marginLeft:'20px' }} gutterBottom>
          Order Items
        </Typography>
        <TableContainer component={Paper} style={{width:450,  marginLeft:'40px', backgroundColor: "#f0f0f0", }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Medicine ID</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder &&
                selectedOrder.cart.medicines.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {medicines.flat().find((medicine) => medicine._id === item.medicine_id)?.medicineName || 'N/A'}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {medicines.flat().find((medicine) => medicine._id === item.medicine_id)?.price || 0}
                    </TableCell>
                    <TableCell>
                      {(medicines.flat().find((medicine) => medicine._id === item.medicine_id)?.price || 0) * item.quantity || 0}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBCard>
    </div>
  );
}};

export default OrderDetails;
