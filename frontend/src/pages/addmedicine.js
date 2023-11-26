import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios'; // Import axios
//import ImageUploadForm from '../components/ImageUploadForm'; // Import the ImageUploadForm component

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
} from "@mui/material";

const AddMedicine = () => {
  const [medicineName, setMedicineName] = useState("");
  const [description, setDescription] = useState("");
  const [medicinalUsage, setMedicinalUsage] = useState("");
  const [activeIngredients, setActiveIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [sales, setSales] = useState(0);
  const [image, setImage] = useState();

  const [isMedicineAdded, setIsMedicineAdded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddIngredient = () => {
    if (ingredientName && ingredientAmount) {
      const newIngredient = { ingredientName, ingredientAmount };
      setActiveIngredients([...activeIngredients, newIngredient]);
      setIngredientName("");
      setIngredientAmount("");
    }
  };

  const handleSubmit = async (e) => {
   /* const formData = {
      medicineName,
      description,
      medicinalUsage,
      activeIngredients,  // Send the array of activeIngredients
      quantity,
      price,
      sales,
    };*/
    const formData = new FormData();
    formData.append('medicineName', medicineName);
    formData.append('description', description);
    formData.append('medicinalUsage', medicinalUsage);
    formData.append('activeIngredients', JSON.stringify(activeIngredients));
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('sales', sales);
    formData.append('image', image);
    console.log(medicineName)
    /*const jsonData = {
      medicineName,
      description,
      medicinalUsage,
      activeIngredients,  // Send the array of activeIngredients
      quantity,
      price,
      sales,
    };*/
  
    // Append the JSON data as a field in FormData
    //formData.append('jsonData', JSON.stringify(jsonData));

    const validationErrors = {};

    /*if (!medicineName) {
      validationErrors.medicineName = "Medicine Name is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
*/
     // console.log("HERE")

      /*const response = await fetch(
        "http://localhost:8001/pharmacist/medicines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: (jsonData),
        }
      );*/
      //console.log(jsonData)

      try{
        const response= axios.post('http://localhost:8001/pharmacist/medicines', formData )
        setIsMedicineAdded(true);
        setSuccessMessage("Medicine added successfully");
        setMedicineName("");
        setDescription("");
        setMedicinalUsage("");
        setActiveIngredients([]);
        setIngredientName("");
        setIngredientAmount("");
        setQuantity(0);
        setPrice(0);
        setSales(0);
        setImage(null)
        e.target["image1"].value = null;

        setErrors({});
      }
      catch(er){
        console.log(er)
      }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Navbar />
        <Grid container spacing={3}>
          {isMedicineAdded && (
            <Grid item xs={12}>
              <Typography variant="body1" color="success">
                {successMessage}
              </Typography>
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
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={handleAddIngredient}>
                  Add Ingredient
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
            <input type="file" name="image1" onChange={(e) => setImage(e.target.files[0])} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add Medicine
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default AddMedicine;
