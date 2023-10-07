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
  const medicinesResponse = useAxios();

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
      const { medicalUsage } = medicine;
      const filter = filterMedicalUsage.toLowerCase();
      return medicalUsage.toLowerCase().includes(filter);
    }
    return true;
  });

  return (
    
    <div className="search_and_filter" style={{ padding: '20px' }}>

      <h1>Available Medicines</h1>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '1rem' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <i className="fa fa-search" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Filter by Medical Usage"
        variant="outlined"
        fullWidth
        size="small"
        value={filterMedicalUsage}
        onChange={handleFilterChange}
        style={{ marginBottom: '1rem' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <i className="fa fa-filter" />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredByMedicalUsage.map((medicine) => (
         
          <Grid item xs={11} sm={5} md={3} lg={2} key={medicine._id}>
            <Link to={`/medicine/${medicine.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  alt={medicine.medicineName}
                  image={medicine.picture}
                 
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {medicine.medicineName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {medicine.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Medical Usage: {medicine.medicalUsage}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {medicine.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MedicineList;
