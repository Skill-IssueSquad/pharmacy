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
import ResponsiveAppBar from './navBarC'


import { useNavigate } from 'react-router-dom';
const MyContext = React.createContext();





const MultiLevelFilterTable = () => {
  const [filter, setFilter] = useState({ medicineName: "", medicinalUsage: "" });
  const [data, setData] = useState([]); // Store the fetched data
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [getRender, setRender] = useState(false);
  const [hashMap, setHashMap] = useState({});
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([]);
  const [disableSave, setDisableSave] = useState(true);

  const [cart, setCart] = useState({
    medicines: [],
    totalPrice: 0,
    discount: 0,
    netPrice: 0,
  });  
  var userName = localStorage.getItem('username'); 
  useEffect(() => {
    // Fetch the data when the component mounts
    fetchMedicines();
    fetchDiscount(userName);
  }, []);



  const fetchDiscount = async (username) => {
    try {
      console.log("Fetching discount for user:", username);
  
      const response = await fetch('http://localhost:8000/getPatientDiscount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
        }),
      });
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
  
      const data = await response.json();
  
      console.log("Discount data:", data);
  
      setCart((prevCart) => {
        prevCart.discount = data.data.Cartdiscount;
        return {
          ...prevCart,
        };
      });
  
      console.log("Discount set:", data.data.discount);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    const getPrescriptionMedicines = async (username) => {
      try {
        const response = await fetch('http://localhost:8000/getPrescription/sendPrescriptionMedicinesToPharmacy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setPrescriptionMedicines(data.data);
      } catch (error) {
        console.error('Error getting prescription medicines:', error);
      }
    };
  
    getPrescriptionMedicines(userName);
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
  
      const netPrice = totalPrice - totalPrice*(prevCart.discount/100);
  

      prevCart.totalPrice =totalPrice;
      prevCart.netPrice = netPrice;
      return {
        ...prevCart
    
      };
    });
  
    // Now, if you log `cart` here, it will reflect the updated state
    console.log(cart);
    setHashMap({});
    SaveCartToDB(userName,cart);
    setCart({
      medicines: [],
      totalPrice: 0,
      discount: 0,
      netPrice: 0,
    })
    setDisableSave(true);
    alert("Cart has been saved successfully");
  };


  const SaveCartToDB = (username,cart) => fetch('http://localhost:8001/patient/saveCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      cart,
      data
      
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


  
  const addToCart = (id,medicineName,prescription) => {

    if(prescription){

      console.log("ana fe prescription");
      if(prescriptionMedicines.length === 0){
        alert("You need a prescription to buy this medicine");
        return;
      }
      for(let i = 0;i<prescriptionMedicines.length;i++){
        if(prescriptionMedicines[i].medicineName === medicineName)
          break;
        else if(i === prescriptionMedicines.length - 1){
          alert("You need a prescription to buy this medicine");
          return;
        }

      }
      
    }



    console.log(hashMap[id]);
    if(hashMap[id] === undefined || hashMap[id] === 0){
      alert("Please choose an amount");
      return;
    }
    const existingMedicineIndex = cart.medicines.findIndex(
      (medicine) => medicine.medicine_id === id
    );

  
    if (existingMedicineIndex !== -1) {
      
      // If the medicine already exists in the cart, update its quantity
      const updatedMedicines = [...cart.medicines];
      updatedMedicines[existingMedicineIndex].quantity += hashMap[id];


      if(updatedMedicines[existingMedicineIndex].quantity >  data.find((item) => item._id === id)?.quantity){
        updatedMedicines[existingMedicineIndex].quantity = data.find((item) => item._id === id)?.quantity;
      }

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
    alert("Medicine added to cart. Please save your cart before proceeding to checkout.");
    setDisableSave(false);
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



  const navigate = useNavigate();

  const viewAlternatives = (medicineName) => {
    
      navigate('/viewAlternatives', { state: {medicineName} });
   
    
  };







  const viewCart = () => {
    
    console.log('Item viewed');
  };




  const fetchMedicines = async () => {
    try {
      console.log("HERE:");
      const response = await fetch("http://localhost:8001/medicine");
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
    "Medicine",
    "Description",
    "Usage",
    "Active Ingredients",
    "Price",
    "Picture",
    "Status",
    "Quantity",
    "Purchase"
  ];

  const filteredData = data.filter((item) => {
    const { medicineName, medicinalUsage } = filter;
    return (
      item.medicineName.toLowerCase().includes(medicineName.toLowerCase()) &&
      item.medicinalUsage.toLowerCase().includes(medicinalUsage.toLowerCase())
    );
  });

  return (
    <div>
       <div style={{ marginBottom: '5px' }}>
        <ResponsiveAppBar button={"Home"}/>
      </div>
    <div style={{ paddingTop:'40px',display: 'flex' ,alignItems:'center',justifyContent:'center',flexDirection: 'column', }} > 
      <div style={{ display: 'flex' ,alignItems:'center',justifyContent:'center'}}>
     <h1 style={{fontWeight:'400', fontSize: '30px', marginLeft:'-400px' ,marginRight: '40px', marginTop:'5px', position:'relative'}}>Available Medicines</h1>
      <TextField
        label="Filter by Name"
        name="medicineName"
        value={filter.medicineName}
        onChange={handleFilterChange}
      />
      <TextField style={{marginLeft:'50px'}}
        label="Filter by Usage"
        name="medicinalUsage"
        value={filter.medicinalUsage}
        onChange={handleFilterChange}
      />
      <Button style={{marginLeft:'50px'}} onClick={saveCart} variant="contained" disabled={disableSave}>Save Cart </Button>

    </div>
    <div>
      <TableContainer component={Paper} style={{width:1400, height:520, marginTop: "25px", border: '1px solid blue',  }}>
        <Table style={{ width: '1400px' ,height:'1000px', tableLayout: 'fixed'}}>
          <TableHead sx = {{padding : "0px", } }>
            <TableRow sx = {{padding : "0px", }}>
              {tableHeaders.map((header) => (
                <TableCell key={header}  sx = {{padding : "20px",textAlign: 'center', borderColor:'blue', position: 'sticky', top: 0, background: '#fff', zIndex: 1, fontWeight:'bold' }}>
                  {header}{" "}
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.map((item) => (
    <TableRow key={item._id["$oid"]} sx = {{padding : "0px", borderColor:'blue'}}>
      <TableCell style={{textAlign:'center', padding:'0px', borderColor:'blue',}}>{item.medicineName}</TableCell>
      <TableCell style={{textAlign:'center', padding:'0px', borderColor:'blue',}}>{item.description}</TableCell>
      <TableCell style={{textAlign:'center', borderColor:'blue',}}>{item.medicinalUsage}</TableCell>
      <TableCell style={{textAlign:'center', padding:'10px', borderColor:'blue',}}>
      <ul>
                  {item.activeIngredients.map((ingredient) => (
                    <li key={ingredient._id}>
                      <p>Ingredient Name: {ingredient.ingredientName}</p>
                      <p>Ingredient Amount: {ingredient.ingredientAmount}</p>
                    </li>
                  ))}
                </ul>
                </TableCell>

      <TableCell style={{textAlign:'center', borderColor:'blue',}}>{item.price}</TableCell>
     <TableCell style={{textAlign:'center', borderColor:'blue',}} ><img src = {item.picture } width = "100px"></img></TableCell>
     <TableCell style={{ textAlign: 'center', borderColor:'blue', }}>{item.quantity > 0 ? 'Available' : 'Out of Stock'}</TableCell>
     <TableCell style={{ textAlign: 'center', borderColor:'blue', }}>
  <input
    type="number"
    id={`quantity-${item.id}`} 
    name="quantity"
    min="0"
    max={item.quantity}
    onInput={(e) => handleInput(e, item._id, item.quantity)}
    style={{ width: '75px' }}
    value={hashMap[item._id] || ""}

  />
</TableCell>     <TableCell style={{ textAlign: 'center' , borderColor:'blue',}}> {item.quantity > 0 ? (
        <>
    
      <Button style={{width :"50px",height:"50px",backgroundColor:""}}  onClick={() => addToCart(item._id,item.medicineName,item.requiresPrescription)} disabled={item.quantity === 0}>
        Add To Cart
             
      </Button>
    </>
  ) : (
    <Button style={{width :10 ,height:"50px",}} color="secondary" onClick={() =>viewAlternatives(item.medicineName)}>View Alternatives</Button>
  )}
</TableCell>
      </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
    </div>
  );
};

export default MultiLevelFilterTable;
