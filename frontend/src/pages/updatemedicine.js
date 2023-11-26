import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";

function UpdateMedicine() {
  const { medicineId } = useParams();
  const [medicineData, setMedicineData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [originalMedicineData, setOriginalMedicineData] = useState({});
  const [editedMedicineName, setEditedMedicineName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedMedicinalUsage, setEditedMedicinalUsage] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedSales, setEditedSales] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/pharmacist/medicines/${medicineId}`
        );
        if (response.status === 200) {
          let data = await response.json();
          data = data.data;
          setMedicineData(data);
          setOriginalMedicineData(data);

          setEditedMedicineName(data.medicineName || "");
          setEditedDescription(data.description || "");
          setEditedMedicinalUsage(data.medicinalUsage || "");
          setEditedPrice(data.price || "");
          setEditedSales(data.sales || "");
          setEditedQuantity(data.quantity || "");
        } else {
          // Handle error
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMedicineDetails();
  }, [medicineId]);

  const handleSave = async () => {
    try {
      const updatedData = {
        medicineName: editedMedicineName,
        description: editedDescription,
        medicinalUsage: editedMedicinalUsage,
        price: editedPrice,
        sales: editedSales,
        quantity: editedQuantity,
      };

      for (const key in updatedData) {
        if (updatedData[key] === "") {
          updatedData[key] = originalMedicineData[key];
        }
      }

      const response = await fetch(
        `http://localhost:8001/pharmacist/medicines/${medicineId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        setOriginalMedicineData(updatedData);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "medicineName") {
      setEditedMedicineName(value);
    } else if (field === "description") {
      setEditedDescription(value);
    } else if (field === "medicinalUsage") {
      setEditedMedicinalUsage(value);
    } else if (field === "price") {
      setEditedPrice(value);
    } else if (field === "sales") {
      setEditedSales(value);
    } else if (field === "quantity") {
      setEditedQuantity(value);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Update Medicine</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Medicine Name:</Typography>
          {isEditing ? (
            <TextField
              label="Medicine Name"
              fullWidth
              value={editedMedicineName}
              onChange={(e) => handleInputChange("medicineName", e.target.value)}
            />
          ) : (
            <Typography variant="body2">
              {originalMedicineData.medicineName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description:</Typography>
          {isEditing ? (
            <TextField
              label="Description"
              fullWidth
              value={editedDescription}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          ) : (
            <Typography variant="body2">
              {originalMedicineData.description}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Medicinal Usage:</Typography>
          {isEditing ? (
            <TextField
              label="Medicinal Usage"
              fullWidth
              value={editedMedicinalUsage}
              onChange={(e) => handleInputChange("medicinalUsage", e.target.value)}
            />
          ) : (
            <Typography variant="body2">
              {originalMedicineData.medicinalUsage}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Price:</Typography>
          {isEditing ? (
            <TextField
              label="Price"
              fullWidth
              type="number"
              value={editedPrice}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          ) : (
            <Typography variant="body2">
              {originalMedicineData.price}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Sales:</Typography>
          {isEditing ? (
            <TextField
              label="Sales"
              fullWidth
              type="number"
              value={editedSales}
              onChange={(e) => handleInputChange("sales", e.target.value)}
            />
          ) : (
            <Typography variant="body2">
              {originalMedicineData.sales}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Quantity:</Typography>
          {isEditing ? (
            <TextField
              label="Quantity"
              fullWidth
              type="number"
              value={editedQuantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
          ) : (
            <Typography variant="body2">
              {originalMedicineData.quantity}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Medicine
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default UpdateMedicine;
