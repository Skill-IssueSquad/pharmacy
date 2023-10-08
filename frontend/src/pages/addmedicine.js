import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const AddMedicine = () => {
  // Define state variables to store form data
  const [medicineName, setMedicineName] = useState('');
  const [description, setDescription] = useState('');
  const [medicinalUsage, setMedicinalUsage] = useState('');
  const [activeIngredients, setActiveIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [isMedicineAdded, setIsMedicineAdded] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  // Function to handle adding active ingredients
  const handleAddIngredient = () => {
    if (ingredientName && ingredientAmount) {
      const newIngredient = { ingredientName, ingredientAmount };
      setActiveIngredients([...activeIngredients, newIngredient]);
      setIngredientName('');
      setIngredientAmount('');
    }
  };

  // Function to handle submitting the form
  const handleSubmit = async () => {
    console.log('handleSubmit called'); // Add this line
    
    // Create a payload with the form data
    const formData = {
      medicineName,
      description,
      medicinalUsage,
      activeIngredients,
      quantity,
      price,
    };
  
    try {
      // Make an HTTP POST request to your server endpoint
      const response = await fetch('http://localhost:8000/pharmacist/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response status:', response.status); // Add this line
  
      // Check the response status and handle success or error
      if (response.status === 201) {
        // Medicine successfully added
    setIsMedicineAdded(true);
    setSuccessMessage('Medicine added successfully');
        setMedicineName('');
        setDescription('');
        setMedicinalUsage('');
        setActiveIngredients([]);
        setIngredientName('');
        setIngredientAmount('');
        setQuantity(0);
        setPrice(0);
      } else {
        // Handle errors, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error); // Add this line
      // Handle network or other errors
    }


    
  };
  


  return (
    <Grid container spacing={3}>
        {isMedicineAdded && (
  <Grid item xs={12}>
    <Typography variant="successMessage">{successMessage}</Typography>
  </Grid>
)}

      <Grid item xs={12}>
        <Typography variant="h4">Add Medicine</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Medicine Name"
          fullWidth
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          fullWidth
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Medicinal Usage"
          fullWidth
          value={medicinalUsage}
          onChange={(e) => setMedicinalUsage(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Active Ingredients</Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              label="Ingredient Name"
              fullWidth
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Ingredient Amount"
              fullWidth
              value={ingredientAmount}
              onChange={(e) => setIngredientAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleAddIngredient}>
              {/* Add ingredient button */}
            </IconButton>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ingredient Name</TableCell>
                <TableCell>Ingredient Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeIngredients.map((ingredient, index) => (
                <TableRow key={index}>
                  <TableCell>{ingredient.ingredientName}</TableCell>
                  <TableCell>{ingredient.ingredientAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Quantity"
          fullWidth
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Medicine
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddMedicine;
