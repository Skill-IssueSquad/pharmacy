import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {Cart} from './Cart';
const MultiLevelFilterTable = () => {
  const [filter, setFilter] = useState({ medicineName: "", medicinalUsage: "" });
  const [data, setData] = useState([]); // Store the fetched data
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [getRender, setRender] = useState(false);
  const [hashMap, setHashMap] = useState({});

  const [cart, setCart] = useState({
    medicines: [],
    totalPrice: 0,
    discount: 0,
    netPrice: 0,
  });  var userName = "testuser"; 
  useEffect(() => {
    // Fetch the data when the component mounts
    fetchMedicines();
  }, []);



  const updateHashMap = (key, value) => {
    setHashMap((prevHashMap) => {
      const updatedHashMap = { ...prevHashMap };

      updatedHashMap[key] = value
      // if (updatedHashMap.hasOwnProperty(key)) {
      //   updatedHashMap[key] += value;
      // } else {
      //   updatedHashMap[key] = value;
      // }

      return updatedHashMap;
    });
  };

  const saveCart = (id) => {
    setCart((prevCart) => {
      const totalPrice = calculateTotalPrice(prevCart.medicines);
      console.log("The Fucking total: " + totalPrice);
  
      const netPrice = totalPrice - prevCart.discount;
  

      prevCart.totalPrice =totalPrice;
      prevCart.netPrice = netPrice;
      return {
        ...prevCart
    
      };
    });
  
    // Now, if you log `cart` here, it will reflect the updated state
    console.log(cart);
    SaveCartToDB(userName,cart);
  };



  const SaveCartToDB = (username,cart) => fetch('http://localhost:8000/patient/saveCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      cart
      
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
      //console.log("I am here");
      
    })
    .catch((error) => console.error('Error Saving Cart to the Database :', error));











  const handleInput = (event, itemId, maxQuantity) => {
    const inputElement = event.target;
    let enteredValue = parseInt(inputElement.value, 10);
  
    // Check if the entered value is a number
    if (isNaN(enteredValue)) {
      enteredValue = 0;
    }
  
    // Ensure the entered value is within the specified range
    enteredValue = Math.max(0, Math.min(enteredValue, maxQuantity));
  
    // Update the input value
    inputElement.value = enteredValue;
    
    updateHashMap(itemId,enteredValue);
    
    // You can store or handle the entered value and itemId as needed
    // For example, you might want to update the corresponding item in your state.
    // handleItemQuantityChange(itemId, enteredValue);
  };


  
  const addToCart = (id) => {
    const existingMedicineIndex = cart.medicines.findIndex(
      (medicine) => medicine.medicine_id === id
    );
  
    if (existingMedicineIndex !== -1) {
      // If the medicine already exists in the cart, update its quantity
      const updatedMedicines = [...cart.medicines];
      updatedMedicines[existingMedicineIndex].quantity += hashMap[id];

      setCart((prevCart) => ({
        ...prevCart,
        medicines: updatedMedicines,
      }));
    } else {
      // If the medicine is not in the cart, add it as a new entry
      const newMedicine = {
        medicine_id: id,
        quantity: hashMap[id],
      };

      setCart((prevCart) => ({
        ...prevCart,
        medicines: [...prevCart.medicines, newMedicine],
      }));
    }

    // Calculate totalPrice, netPrice, and update the state
   // const totalPrice = calculateTotalPrice(cart.medicines);
    //const netPrice = totalPrice - 0;

    setCart((prevCart) => ({
      ...prevCart
      
    }));
  };



  const calculateTotalPrice = (medicines) => {
    console.log("ana hna");
    return medicines.reduce((total, medicine) => {
      console.log("Hna ya medicine ya negm:" +medicine.medicine_id);
      // You need to fetch the actual price of the medicine from your data
      const medicinePrice = data.find((item) => item._id === medicine.medicine_id)?.price || 0;
      console.log(medicinePrice);
      console.log(hashMap[medicine.medicine_id]);
      return total + hashMap[medicine.medicine_id] * medicinePrice;
    }, 0);
  }









  const viewCart = () => {
    
    console.log('Item viewed');
  };




  const fetchMedicines = async () => {
    try {
      console.log("HERE:");
      const response = await fetch("http://localhost:8000/medicine");
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      console.log("Fetched data:", json);

      // Store the fetched data in the 'data' state
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSort = (field) => {
    if (field === sorting.field) {
      // Toggle sorting order
      setSorting({
        field,
        order: sorting.order === "asc" ? "desc" : "asc",
      });
      // Reverse the data array
      setData([...data].reverse());
    } else {
      // Set the field to sort and default order (asc)
      setSorting({
        field,
        order: "asc",
      });
      // Sort the data array by the selected field in ascending order
      setData([...data].sort((a, b) => {
        if (field === "_id") {
          // Special case for sorting by "_id"
          return a[field]["$oid"].localeCompare(b[field]["$oid"]);
        }
        return a[field].localeCompare(b[field]);
      }));
    }
  };
  
  const tableHeaders = [
    "medicineName",
    "description",
    "medicinalUsage",
    "activeIngredients",
    "price",
    "picture",
    "Status",
    "Quantity",
    "Add To Cart"
  ];

  const filteredData = data.filter((item) => {
    const { medicineName, medicinalUsage } = filter;
    return (
      item.medicineName.toLowerCase().includes(medicineName.toLowerCase()) &&
      item.medicinalUsage.toLowerCase().includes(medicinalUsage.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex' ,alignItems:'center',justifyContent:'center',flexDirection: 'column'}} > 
      <div style={{ display: 'flex' ,alignItems:'center',justifyContent:'center'}}>
      <TextField
        label="Filter by medicineName"
        name="medicineName"
        value={filter.medicineName}
        onChange={handleFilterChange}
      />
      <TextField style={{marginLeft:'50px'}}
        label="Filter by medicinalUsage"
        name="medicinalUsage"
        value={filter.medicinalUsage}
        onChange={handleFilterChange}
      />

      <button style={{marginLeft:'50px'}} onClick={viewCart}><a href="/Cart">View Cart </a></button>
      <button style={{marginLeft:'50px'}} onClick={saveCart}>Save Cart </button>

    </div>
    <div>
      <TableContainer component={Paper}>
        <Table style={{ width: '1500px' ,height:'1000px'}}>
          <TableHead sx = {{padding : "64px"} }>
            <TableRow >
              {tableHeaders.map((header) => (
                <TableCell key={header}  sx = {{padding : "64px"}}>
                  {header}{" "}
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.map((item) => (
    <TableRow key={item._id["$oid"]}>
      <TableCell style={{textAlign:'center'}}>{item.medicineName}</TableCell>
      <TableCell style={{textAlign:'center'}}>{item.description}</TableCell>
      <TableCell style={{textAlign:'center'}}>{item.medicinalUsage}</TableCell>
      <TableCell style={{textAlign:'center'}}>
      <ul>
                  {item.activeIngredients.map((ingredient) => (
                    <li key={ingredient._id}>
                      <p>Ingredient Name: {ingredient.ingredientName}</p>
                      <p>Ingredient Amount: {ingredient.ingredientAmount}</p>
                    </li>
                  ))}
                </ul>
                </TableCell>

      <TableCell style={{textAlign:'center'}}>{item.price}</TableCell>
     <TableCell style={{textAlign:'center'}} ><img src = {item.picture } width = "100px"></img></TableCell>
     <TableCell style={{ textAlign: 'center' }}>{item.quantity > 0 ? 'Available' : 'Out of Stock'}</TableCell>
     <TableCell style={{ textAlign: 'center' }}>
  <input
    type="number"
    id={`quantity-${item.id}`} // Use a unique identifier, like item.id
    name="quantity"
    min="0"
    max={item.quantity}
    onInput={(e) => handleInput(e, item._id, item.quantity)}
  />
</TableCell>     <TableCell style={{textAlign:'center'}}><button  onClick={() => addToCart(item._id)} disabled={item.quantity === 0 }>Add To Cart</button></TableCell>
      </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default MultiLevelFilterTable;
