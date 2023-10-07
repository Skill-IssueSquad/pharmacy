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
import { Link } from 'react-router-dom';

const dummyData = [
    {
      id: 1,
      name: 'Medicine 1',
      price: '$10',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      medicalUsage: 'For pain relief',
      imageUrl: 'https://example.com/medicine1.jpg',
    },
    {
      id: 2,
      name: 'Medicine 2',
      price: '$15',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      medicalUsage: 'For allergies',
      imageUrl: 'https://example.com/medicine2.jpg',
    },
    {
      id: 3,
      name: 'Medicine 2',
      price: '$20',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      medicalUsage: 'For cough and cold',
      imageUrl: 'https://example.com/medicine3.jpg',
    },
    {
      id: 4,
      name: 'Medicine 2',
      price: '$12',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      medicalUsage: 'For fever',
      imageUrl: 'https://example.com/medicine4.jpg',
    },
    // Add more dummy data here
  ];
  
 
  

const MedicineList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMedicalUsage, setFilterMedicalUsage] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterMedicalUsage(event.target.value);
  };

  // Function to filter the medicines based on the search term
  const filteredMedicines = dummyData.filter((medicine) => {
    const { name } = medicine;
    const search = searchTerm.toLowerCase();
    return search ? name.toLowerCase().includes(search) : true;
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
    <div style={{ padding: '20px' }}>
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
          <Grid item xs={12} sm={6} md={4} lg={3} key={medicine.id}>
            <Link to={`/medicine/${medicine.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  alt={medicine.name}
                  image={medicine.imageUrl}
                  style={{ height: 0, paddingTop: '56.25%' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {medicine.name}
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
