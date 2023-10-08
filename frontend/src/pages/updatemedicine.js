import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function UpdateMedicine() {
  const { medicineId } = useParams();
  const [medicineData, setMedicineData] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Whether in editing mode

  useEffect(() => {
    // Fetch medicine details based on medicineId and update medicineData state
    const fetchMedicineDetails = async () => {
      try {
        const response = await fetch(`/pharmacist/medicines/${medicineId}`);
        if (response.status === 200) {
          const data = await response.json();
          setMedicineData(data);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMedicineDetails();
  }, [medicineId]);

  const handleSave = async () => {
    try {
      // Send updated medicineData to the server for saving
      const response = await fetch(`http://localhost:8000/pharmacist/medicines/${medicineId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData),
      });

      if (response.status === 200) {
        // Handle successful update, e.g., show a success message or redirect
        setIsEditing(false); // Exit editing mode after saving
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setMedicineData({
      ...medicineData,
      [field]: value,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Update Medicine</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Medicine Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Medicine Name: {medicineData.medicineName}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Description: {medicineData.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Medicinal Usage: {medicineData.medicinalUsage}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Price: {medicineData.price}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Sales: {medicineData.sales}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Quantity: {medicineData.quantity}</Typography>
      </Grid>
      {/* Add more fields for other medicine details */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
          Edit Medicine
        </Button>
      </Grid>

      {/* Editable Fields */}
      {isEditing && (
        <Grid item xs={12}>
          <Typography variant="h6">Update Medicine Details</Typography>
        </Grid>
      )}
      {isEditing && (
        <Grid item xs={12}>
          <TextField
            label="Medicine Name"
            fullWidth
            value={medicineData.medicineName || ''}
            onChange={(e) => handleInputChange('medicineName', e.target.value)}
          />
        </Grid>
      )}
      {/* Add more editable fields for other medicine details */}
      {isEditing && (
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default UpdateMedicine;
