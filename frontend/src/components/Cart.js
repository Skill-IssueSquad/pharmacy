import React, { useState, useEffect } from 'react';

const Cart = () => {
  
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const requestData = {
        username: 'testuser', // Replace with your attribute name and value
      };

      const requestOptions = {
        method: 'POST', // You can use 'POST' or 'PUT' or any appropriate HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON if you're sending JSON data
        },
        body: JSON.stringify(requestData), // Convert the data to JSON format
      };


    // Fetch cart items when the component mounts
    fetch('http://localhost:8000/patient/cart', requestOptions)
      .then((response) => { if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }})
      .then((data) => setCartItems(data.data.medicines))
      .catch((error) => console.error('Error fetching cart items:', error));



  }, []);

  const [medicines, setMedicines] = useState([]);


  useEffect(() => {
  const fetchMedicines = (cartItems) => {
    // Send a request to your server with the list of medicine IDs
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
        // Here, you have the specific medicines, and you can update your component state accordingly
        console.log('Medicines:', medicines);
        setMedicines(medicineOutputs);
      })
      .catch((error) => console.error('Error fetching medicines:', error));
  };
  fetchMedicines(cartItems);

}, [cartItems]);

// // const fetchMedicines = async () => {
// //     try {
// //       console.log("HERE:");
// //       const response = await fetch("http://localhost:8000/medicine");
// //       console.log("Response status:", response.status);

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch data");
// //       }
// //       const json = await response.json();
// //       console.log("Fetched data:", json);

// //       // Store the fetched data in the 'data' state
// //       setCartItems(json);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };
// const fetchMedicines = (medicineIds) => {
//     // Send a request to your server with the list of medicine IDs
//     fetch('http://localhost:8000/medicines', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ medicineIds }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error('Network response was not ok');
//         }
//       })
//       .then((medicines) => {
//         // Here, you have the specific medicines, and you can update your component state accordingly
//         console.log('Medicines:', medicines);
//       })
//       .catch((error) => console.error('Error fetching medicines:', error));
//   };
// console.log(cartItems);
  var i = 0;
  return (
    <div>
      <h2>Cart Items</h2>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Description</th>
            <th>Medical Use</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {medicines&&medicines.map((item) => (
            <tr key={item.id}>
              <td>{item.medicineName}</td>
              <td>{item.description}</td>
              <td>{item.medicinalUsage}</td>
              <td>{item.price}</td>
              <td>{cartItems[i].quantity}</td>
              <td>{cartItems[i++].quantity*item.price}</td>
              <td>
                <img src={item.photo} alt={item.name} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;