import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const username = "testuser";
  let  fetchUser=(username)=>{};
  useEffect(() => {
     fetchUser = (username) => {
      fetch('http://localhost:8000/patient/getPatient', {
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
          }
        })
        .catch((error) => console.error('Error adding address to patient', error));
    };

    fetchUser(username);
  }, []);



















  useEffect(() => {
    const fetchMedicines = (orderData) => {
      const allMedicines = [];

      orderData.forEach((orderItem) => {
        const cartItems = orderItem.cart.medicines.map((medicine) => ({ medicine_id: medicine.medicine_id }));

        fetch('http://localhost:8000/medicine/getArrayMedicinesByID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartItems }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then((medicineOutputs) => {
            allMedicines.push(medicineOutputs);
          })
          .catch((error) => console.error('Error fetching medicines:', error));
      });

      setMedicines(allMedicines);
    };

    fetchMedicines(order);
  }, [order]);

  const formatAddress = (addressObject) => {
    const parts = [];
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

    // Fetch user again to get the updated orders based on the selected order
    fetchUser(username);
  };



  const DeleteOrder = (username) => {

    const id = selectedOrder.id;
    console.log("The id:",id );
    fetch('http://localhost:8000/patient/deleteOrder', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        orderID: id
      
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
       
        window.location.reload();

        // alert("Added to cart");
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  }
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Order Information
      </Typography>
      <FormControl style={{ marginBottom: 20, minWidth: 120 }}>
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
      <TableContainer component={Paper}>
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
                  <TableCell><button onClick={() => DeleteOrder(username)}>Cancel Order</button></TableCell>
                </>
              ) : null}
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" style={{ marginTop: 20 }} gutterBottom>
        Delivery Address
      </Typography>
      {selectedOrder && (
        <Typography>
          {formatAddress(selectedOrder.deliveryAddress)}
        </Typography>
      )}
      <Typography variant="h6" style={{ marginTop: 20 }} gutterBottom>
        Order Items
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine ID</TableCell>
              <TableCell>Quantity</TableCell>
              {/* Assuming you have a price property in your medicine object */}
              <TableCell>Price</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrder &&
              selectedOrder.cart.medicines.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.medicine_id}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  {/* Assuming you have a price property in your medicine object */}
                  <TableCell>{/* item.price */}</TableCell>
                  {/* Assuming you have a price property in your medicine object */}
                  <TableCell>{/* item.quantity * item.price */}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderDetails;