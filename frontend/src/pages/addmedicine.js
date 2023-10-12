import React, { useState } from 'react';
import Navbar from '../components/Navbar';

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
  const [ingredientAmount, setIngredientAmount] = useState(''); // Changed to a string
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [sales, setSales] = useState(0); // Add Sales state
  const [isMedicineAdded, setIsMedicineAdded] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({}); // Add errors state for validation

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
    // Create a payload with the form data
    const formData = {
      medicineName,
      description,
      medicinalUsage,
      activeIngredients,
      quantity,
      price,
      sales, // Add the 'sales' field
    };

    // Validate form fields
    const validationErrors = {};

    if (!medicineName) {
      validationErrors.medicineName = 'Medicine Name is required';
    }

    // Update the following check to allow empty strings
    if (ingredientAmount !== null && typeof ingredientAmount !== 'string') {
      validationErrors.ingredientAmount = 'Ingredient Amount should be a string';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Make an HTTP POST request to your server endpoint
      const response = await fetch('http://localhost:8000/pharmacist/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

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
        setSales(0); // Reset 'sales'
        setErrors({}); // Clear validation errors
      } else {
        // Handle errors, e.g., show an error message
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return (
    <div>
      <Navbar/>
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
          error={errors.medicineName}
          helperText={errors.medicineName}
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
              error={errors.ingredientAmount}
              helperText={errors.ingredientAmount}
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
        <TextField
          label="Sales"
          fullWidth
          type="number"
          value={sales}
          onChange={(e) => setSales(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Medicine
        </Button>
      </Grid>
    </Grid>
    </div>
  );
};

export default AddMedicine;
