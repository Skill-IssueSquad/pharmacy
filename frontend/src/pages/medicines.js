import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Link } from "react-router-dom";

import useAxios from '../useAxios';
import { useEffect } from 'react';

const MedicineList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMedicalUsage, setFilterMedicalUsage] = useState('');
  const [dummyData, setDummyData] = useState([]);
  const medicinesResponse = useAxios("http://localhost:8000/pharmacist/medicines");

  // Update dummyData with fetched data whenever medicinesResponse changes
  useEffect(() => {
    // Extract the data array from the response
    if (medicinesResponse.data && Array.isArray(medicinesResponse.data)) {
      setDummyData(medicinesResponse.data);
    }
  }, [medicinesResponse]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterMedicalUsage(event.target.value);
  };

  // Function to filter the medicines based on the search term
  const filteredMedicines = dummyData.filter((medicine) => {
    const { medicineName } = medicine;
    const search = searchTerm.toLowerCase();
    return search ? medicineName.toLowerCase().includes(search) : true;
  });

  // Function to filter the medicines based on the selected medical usage
  const filteredByMedicalUsage = filteredMedicines.filter((medicine) => {
    if (filterMedicalUsage) {
      const { medicinalUsage } = medicine;
      const filter = filterMedicalUsage.toLowerCase();
      return medicinalUsage.toLowerCase().includes(filter);
    }
    return true;
  });

  return (
    <div className="search_and_filter" style={{ padding: '20px' }}>

      <h1>Available Medicines</h1>
      <div className="TextFields">
      <div className="input-container">
        <Typography variant="body2">Search by Name</Typography>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="input-container">
        <Typography variant="body2">Filter by Medical Usage</Typography>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={filterMedicalUsage}
          onChange={handleFilterChange}
        />
      </div>
</div>
{medicinesResponse &&<div>
      <Grid container spacing={3}>
        {filteredByMedicalUsage.map((medicine) => (
          <Grid item xs={11} sm={5} md={3} lg={2} key={medicine._id}>
          
              <Card>
                <CardMedia
                  component="img"
                  alt={medicine.medicineName}
                  image={medicine.picture}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Name: {medicine.medicineName}
                  </Typography>
                  <Typography variant="body2" >
                   Description: {medicine.description}
                  </Typography>
                  <Typography variant="body2" >
                     Usage: {medicine.medicinalUsage}
                  </Typography>
                  <Typography variant="body2" component="div">
                     Price: {medicine.price}
                  </Typography>
                  <Typography variant="body2" component="div">
                     Sales: {medicine.sales}
                  </Typography>
                  <Typography variant="body2" component="div">
                     Quantity: {medicine.quantity}
                  </Typography>
                </CardContent>
              </Card>
            
          </Grid>
        ))}
      </Grid>
      </div>}
    </div>
  );
};

export default MedicineList;
