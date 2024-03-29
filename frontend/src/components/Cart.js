import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./navBarC";
import { auth } from "../pages/Protected/AuthProvider";
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

const MyContext = React.createContext();

const Cart = () => {
  auth();
  var userName = localStorage.getItem("username");
  const [cartItems, setCartItems] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [changedCart, setChangedCart] = useState(0);
  const [loading, setLoading] = useState(true); 
  const addQuantity = (id) => {
    
    fetch(`http://localhost:8001/medicine/addToCart/${userName}/${id}/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
        const index = updatedCartItems.findIndex(
          (item) => item.medicine_id === id
        );
        const indexM = medicines.findIndex((item) => item._id === id);

        if (medicines[indexM].quantity <= updatedCartItems[index].quantity) {
          alert("Out of stock");

          return updatedCartItems;
        } else {
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
    if (updatedCartItems[index].quantity === 1) {
      
      fetch("http://localhost:8001/patient/removeMedicineFromCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userName, medicineId: id }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          // Here, you have the specific medicines, and you can update your component state accordingly
          console.log("Omar: " + data.data.medicines);

          setCartItems(data.data.medicines);
          //fetchMedicines(cartItems);
          console.log("Medicines:", medicines);

          return cartItems;
        })
        .catch((error) =>
          console.error("Error Deleting medicine from Cart:", error)
        );
      // removeQuantity(id);
    } else {
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

  const removeItemFromCart = (id) => {
    
    fetch("http://localhost:8001/patient/removeMedicineFromCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userName, medicineId: id }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        // Here, you have the specific medicines, and you can update your component state accordingly
        console.log("Omar: " + data.data.medicines);

        setCartItems(data.data.medicines);
        //fetchMedicines(cartItems);
        console.log("Medicines:", medicines);

        return cartItems;
      })
      .catch((error) =>
        console.error("Error Deleting medicine from Cart:", error)
      );
    // removeQuantity(id);
  };

  useEffect(() => {
    const requestData = {
      username: userName,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(requestData),
    };

    // Fetch cart items when the component mounts
    
    fetch("http://localhost:8001/patient/cart", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => setCartItems(data.data.medicines))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const navigate = useNavigate();

  const navigateToCheckout = async (cartItems, medicines) => {
    setChangedCart(!changedCart);

    if (cartItems.length > 0) {
      for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const medicine = medicines.find(
          (item) => item._id === cartItem.medicine_id
        );

        if (cartItem.quantity > medicine.quantity) {
          if (medicine.quantity === 0) {
            await removeItemFromCart(medicine._id);
          } else {
            cartItem.quantity = medicine.quantity;
          }

          alert("Cart has been updated due to lack of stock");
          return;
        }
      }

      console.log("cartItems: ", cartItems);
      console.log("Medicines New: ", medicines);
    }

    if (cartItems.length > 0) {
      await navigate("/Checkout", {
        state: { data: cartItems, medicines: medicines },
      });
    } else {
      alert("Cart is empty");
    }
  };

  useEffect(() => {
    const fetchMedicines = (cartItems) => {
      // Send a request to your server with the list of medicine IDs

      
      
      fetch("http://localhost:8001/medicine/getArrayMedicinesByID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((medicineOutputs) => {
          // Here, you have the specific medicines, and you can update your component state accordingly
          setMedicines(medicineOutputs);
          console.log("Medicines:", medicines);
        setLoading(false);
        })
        .catch((error) => console.error("Error fetching medicines:", error));
    };
    fetchMedicines(cartItems);
  }, [cartItems, changedCart]);

  // // const fetchMedicines = async () => {
  // //     try {
  // //       console.log("HERE:");
  // //       const response = await fetch("https://localhost:8001/medicine");
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
  //     fetch('https://localhost:8001/medicines', {
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


  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>
          Loading...
        </Typography>
      </div>
    );
  }
  else{
  return (
    <div>
      <ResponsiveAppBar button={"Cart"}/>
      <MyContext.Provider value={cartItems}>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <h2>Cart Items</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Medicine Name</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Medical Use</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Quantity</th>
                <th style={tableHeaderStyle}>Total Price</th>
                <th style={tableHeaderStyle}>Photo</th>
                <th style={{ ...tableHeaderStyle, textAlign: "left" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {medicines.length === cartItems.length &&
                medicines.map((item, index) => (
                  <tr
                    key={item.id}
                    style={
                      index % 2 === 0 ? tableRowStyleEven : tableRowStyleOdd
                    }
                  >
                    <td style={{ ...tableCellStyle, textAlign: "left" }}>
                      {item.medicineName}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "left" }}>
                      {item.description}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "left" }}>
                      {item.medicinalUsage}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "left" }}>
                      {item.price}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "left" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "left",
                          justifyContent: "left",
                        }}
                      >
                        {cartItems[index].quantity}
                        <AddIcon
                          disabled={item.quantity === cartItems[index].quantity}
                          onClick={() => addQuantity(item._id)}
                          style={iconStyle}
                        ></AddIcon>
                        <RemoveIcon
                          onClick={() => removeQuantity(item._id)}
                          disabled={cartItems[index].quantity === 0}
                          style={iconStyle}
                        ></RemoveIcon>
                      </div>
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "left",
                        paddingRight: "3px",
                      }}
                    >
                      {cartItems[index].quantity * item.price}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "left" }}>
                      <img src={item.picture} alt={item.name} width="100" />
                    </td>
                    <td style={{ ...tableCellStyle }}>
                      <button
                        onClick={() => removeItemFromCart(item._id)}
                        style={{ ...removeButtonStyle }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={() => navigateToCheckout(cartItems, medicines)}
              style={checkoutButtonStyle}
            >
              Checkout
            </button>
          </div>
        </div>
      </MyContext.Provider>
    </div>
  );
}
};
export default Cart;

// Styles
const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const tableRowStyleOdd = {
  backgroundColor: "#f9f9f9",
};

const tableRowStyleEven = {
  backgroundColor: "#ffffff",
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const iconStyle = {
  cursor: "pointer",
  marginLeft: "5px",
};

const removeButtonStyle = {
  backgroundColor: "#ff6666",
  color: "#ffffff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const checkoutButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  padding: "12px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};
