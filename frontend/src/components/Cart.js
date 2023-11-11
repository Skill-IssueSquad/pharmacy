import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useNavigate } from 'react-router-dom';
const MyContext = React.createContext();


const Cart = () => {
  var userName = "testuser";
  const [cartItems, setCartItems] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const addQuantity = (id) => {
   
    fetch(`http://localhost:8000/medicine/addToCart/${userName}/${id}/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   userName: userName,
      //   medicineId: "616f1a5c1b1b7f2f4c6e8a5f",
      //   quantity: 1,
      // }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        
        // const index = cartItems.findIndex((item) => item.medicine_id === id);

        // console.log("index: "+index);
        // cartItems[index].quantity += 1;
        // setCartItems(cartItems);




      

          const updatedCartItems = [...cartItems];
          const index = updatedCartItems.findIndex((item) => item.medicine_id === id);
          const indexM = medicines.findIndex((item) => item._id === id);

          if(medicines[indexM].quantity <= updatedCartItems[index].quantity)
          {
            alert("Out of stock");
            
            return updatedCartItems;
          }
          else{

          


          if (index !== -1) {
            console.log(updatedCartItems[index].quantity);
            updatedCartItems[index].quantity += 1;
            console.log(updatedCartItems[index].quantity);
          }
        // setCartItems([]);
         setCartItems(updatedCartItems);
          return updatedCartItems;
        }
   

    
       // alert("Added to cart");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const removeQuantity = (id) => {
   
 
        // const index = cartItems.findIndex((item) => item.medicine_id === id);

        // console.log("index: "+index);
        // cartItems[index].quantity += 1;
        // setCartItems(cartItems);




      

          const updatedCartItems = [...cartItems];
          const index = updatedCartItems.findIndex((item) => item.medicine_id === id);

          console.log(index);
          if( updatedCartItems[index].quantity === 1)
          {
       
           fetch('http://localhost:8000/patient/removeMedicineFromCart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, medicineId: id }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Network response was not ok');
              }
            })
            .then((data) => {
              // Here, you have the specific medicines, and you can update your component state accordingly
            console.log("Omar: "+data.data.medicines);

            setCartItems(data.data.medicines);
            //fetchMedicines(cartItems);
            console.log('Medicines:', medicines);

             return cartItems;
            })
            .catch((error) => console.error('Error Deleting medicine from Cart:', error));
           // removeQuantity(id);
          }
        
          


          else{

          


          if (index !== -1) {
            console.log(updatedCartItems[index].quantity);
            updatedCartItems[index].quantity -= 1;
            console.log(updatedCartItems[index].quantity);
          }
        // setCartItems([]);
         setCartItems(updatedCartItems);
          return updatedCartItems;
          }
  };





  const removeItemFromCart =(id)=>{

     fetch('http://localhost:8000/patient/removeMedicineFromCart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, medicineId: id }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Network response was not ok');
              }
            })
            .then((data) => {
              // Here, you have the specific medicines, and you can update your component state accordingly
            console.log("Omar: "+data.data.medicines);

            setCartItems(data.data.medicines);
            //fetchMedicines(cartItems);
            console.log('Medicines:', medicines);

             return cartItems;
            })
            .catch((error) => console.error('Error Deleting medicine from Cart:', error));
           // removeQuantity(id);
          }
  






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

  const navigate = useNavigate();

  const navigateToCheckout = (cartItems ,medicines) => {
    if(cartItems.length> 0)
      navigate('/Checkout', { state: { data: cartItems , medicines: medicines} });
    else{
      alert("Cart is empty");
    }
  };


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
    <MyContext.Provider value={cartItems}>
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
          {medicines.length==cartItems.length&&medicines.map((item) => (
            
            <tr key={item.id}>
              <td>{item.medicineName}</td>
              <td>{item.description}</td>
              <td>{item.medicinalUsage}</td>
              <td>{item.price}</td>
            <div style={{ display: 'flex' ,alignItems:'center',justifyContent:'center'}}>                
                <td>{cartItems[i].quantity}</td>
              
                <AddIcon  disabled={item.quantity === cartItems[i].quantity } onClick={() => addQuantity(item._id)}  ></AddIcon>
                <RemoveIcon  onClick={()=> removeQuantity(item._id)} disabled={cartItems[i].quantity === 0}></RemoveIcon>
                
              </div>
              <td>{cartItems[i++].quantity*item.price}</td>
              <td>
                <img src={item.photo} alt={item.name} width="100" />
              </td>
              <td> <button onClick={()=> removeItemFromCart(item._id)} >Remove from cart</button></td>
            </tr>
          ))}
          
        </tbody>
      </table>
      <div> 
          <button onClick={()=>navigateToCheckout(cartItems , medicines)}>Checkout</button>
        </div>
    </div>
    </MyContext.Provider>
  );
};

export default Cart;
