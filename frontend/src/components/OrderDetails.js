import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { json, useLocation } from 'react-router-dom';
const OrderDetails = () => {
  // Sample data structure, replace this with actual order data
  const [order, setOrder] = useState([]);

  const[Medicines,setMedicines]=useState([]);
const username = "testuser";



//  useEffect(()=>{
//   const fetchUser=(username)=> fetch('http://localhost:8000/patient/getPatient', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Network response was not ok');
//       }
//     })
//     .then((data) => {
//         // const [order, setOrder] = useState({
//         //     id: '1',
//         //     status: 'completed',
//         //     date: '2023-11-09T10:30:00Z', // Sample date string
//         //     cart: [
//         //       { medicineName: 'Medicine 1', quantity: 2, price: 10 },
//         //       { medicineName: 'Medicine 2', quantity: 1, price: 15 },
//         //     ],
//         //     discount: 5,
//         //     netPrice: 25,
//         //     deliveryAddress: {
//         //       streetName: '123 Main St',
//         //       propertyNumber: '456',
//         //       floorNumber: '2',
//         //       apartmentNumber: 'C',
//         //       extraLandmarks: 'Near Park',
//         //     },
//         //   });
        
        
//   //})
      
//     })
//     .catch((error) => console.error('Error Adding address to patient', error));
//    // removeQuantity(id);
//    fetchUser(username);

//   },[]);

useEffect(() => {
  const fetchUser = (username) => fetch('http://localhost:8000/patient/getPatient', {
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

        console.log(fetchedOrders);
        // Assuming setOrders is a function to update the state with the fetched orders
        setOrder(fetchedOrders);
      }
    })
    .catch((error) => console.error('Error adding address to patient', error));

  fetchUser(username);
  console.log(order);
}, []);









  
  // const location = useLocation();
  // const { Order,username,cart , medicines} = location.state;



  // Function to format the delivery address
  const formatAddress = (addressObject) => {
    const parts = [];
console.log(addressObject.streeName);
    //if (addressObject.streetName) parts.push(`Street Name: ${addressObject.streetName}`);
    if (addressObject.propertyNumber) parts.push(`Property Number: ${addressObject.propertyNumber}`);
    if (addressObject.floorNumber) parts.push(`Floor Number: ${addressObject.floorNumber}`);
    if (addressObject.apartmentNumber) parts.push(`Apartment Number: ${addressObject.apartmentNumber}`);
    if (addressObject.extraLandmarks) parts.push(`Extra Landmarks: ${addressObject.extraLandmarks}`);

    return parts.join(', ');
  };

  // Function to format the order date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  /*return  (
    < Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Order Information
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Order Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Net Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {order.map((order,index)=>(

              <TableRow key={index}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell>{order.discount}</TableCell>
              <TableCell>{order.netPrice}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" style={{ marginTop: 20 }} gutterBottom>
        Delivery Address
      </Typography>
      <Typography>{formatAddress(order.deliveryAddress)}</Typography>
      <Typography variant="h6" style={{ marginTop: 20 }} gutterBottom>
        Order Items
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order[0].cart.map((item, index) => (
              <TableRow key={index}>
              <TableCell>{item.medicineName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity * item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
*/
useEffect(() => {
  const fetchMedicines = (orderData) => {
    
    const allMedicines = [];

    
    orderData.forEach((orderItem) => {
      
       const cartItems = orderItem.cart.medicines.map((medicine) => ({ medicine_id: medicine.medicine_id }));

      console.log("Fuck You:" +cartItems.length);
     
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


















return (
  <Container maxWidth="md">
    <Typography variant="h4" align="center" gutterBottom>
      Order Details
    </Typography>
    <Typography variant="h6" gutterBottom>
      Order Information
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Net Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((orderItem, index) => (
            <TableRow key={index}>
              <TableCell>{orderItem.id}</TableCell>
              <TableCell>{orderItem.status}</TableCell>
              <TableCell>{formatDate(orderItem.date)}</TableCell>
              <TableCell>{orderItem.discount}</TableCell>
              <TableCell>{orderItem.netPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography variant="h6" style={{ marginTop: 20 }} gutterBottom>
      Delivery Address
    </Typography>
    {order.map((orderItem, index) => (
      <Typography key={index}>
       {console.log(orderItem)}
    {formatAddress(orderItem.deliveryAddress)} 
      </Typography>
    ))}
    <Typography variant="h6" style={{ marginTop: 20 }} gutterBottom>
      Order Items
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>Medicine Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((orderItem, orderIndex) =>
            orderItem.cart.medicines.map((item, itemIndex) => (
              <TableRow key={`${orderIndex}-${itemIndex}`}>
                <TableCell>{orderItem.id}</TableCell>
                <TableCell>{item.medicine_id}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                {/* Assuming you have a price property in your medicine object */}
                <TableCell>{/* item.price */}</TableCell>
                <TableCell>{/* item.quantity * item.price */}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);
















}
export default OrderDetails;
