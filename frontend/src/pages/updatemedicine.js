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
        <Typography variant="body2">Medicine Name:</Typography>
        {isEditing ? (
          <TextField
            label="Medicine Name"
            fullWidth
            value={medicineData.medicineName || ''}
            onChange={(e) => handleInputChange('medicineName', e.target.value)}
          />
        ) : (
          <Typography variant="body2">{medicineData.medicineName}</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Description:</Typography>
        {isEditing ? (
          <TextField
            label="Description"
            fullWidth
            value={medicineData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        ) : (
          <Typography variant="body2">{medicineData.description}</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Medicinal Usage:</Typography>
        {isEditing ? (
          <TextField
            label="Medicinal Usage"
            fullWidth
            value={medicineData.medicinalUsage || ''}
            onChange={(e) => handleInputChange('medicinalUsage', e.target.value)}
          />
        ) : (
          <Typography variant="body2">{medicineData.medicinalUsage}</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Price:</Typography>
        {isEditing ? (
          <TextField
            label="Price"
            fullWidth
            value={medicineData.price || ''}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
        ) : (
          <Typography variant="body2">{medicineData.price}</Typography>
        )}
      </Grid>
      {/* Add more fields for other medicine details */}
      <Grid item xs={12}>
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Edit Medicine
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default UpdateMedicine;
