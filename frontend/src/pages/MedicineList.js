import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import { Link } from 'react-router-dom';

import useAxios from '../useAxios';
import { useEffect } from 'react';

// Define a fixed height for the cards
const cardHeight = '350px'; // You can adjust this value

const MedicineList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMedicalUsage, setFilterMedicalUsage] = useState('');
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { medicines } = useAxios('http://localhost:8000/pharmacist/medicines');

  // Update Data with fetched data whenever medicinesResponse changes
  useEffect(() => {
    // Extract the data array from the response
    if (medicines.data && Array.isArray(medicines.data)) {
      setData(medicines.data);
    }
  }, [medicines]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterMedicalUsage(event.target.value);
  };

// Function to filter the medicines based on the search term
const filteredMedicines = Data.filter((medicine) => {
  const { medicineName } = medicine;
  const search = searchTerm.toLowerCase();
  return (search && medicineName) ? medicineName.toLowerCase().includes(search) : true;
});

// Function to filter the medicines based on the selected medical usage
const filteredByMedicalUsage = filteredMedicines.filter((medicine) => {
  if (filterMedicalUsage) {
    const { medicinalUsage } = medicine;
    const filter = filterMedicalUsage.toLowerCase();
    return (medicinalUsage && medicinalUsage.trim()) ? medicinalUsage.toLowerCase().includes(filter) : false;
  }
  return true;
});


  // Calculate total number of pages
  const pageCount = Math.ceil(filteredByMedicalUsage.length / rowsPerPage);

  // Function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Get the data for the current page
  const slicedData = filteredByMedicalUsage.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
      {medicines && (
        <div>
          <Grid container spacing={3}>
            {slicedData.map((medicine) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={medicine._id}>
                <Link to={`updatemedicine/${medicine._id}`}>
                  <Card style={{ height: cardHeight }}>
                    <CardMedia
                      component="img"
                      alt={medicine.medicineName}
                      image={medicine.picture}
                      style={{ height: '200px' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Name: {medicine.medicineName}
                      </Typography>
                      <Typography variant="body2">
                        Description: {medicine.description}
                      </Typography>
                      <Typography variant="body2">
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
                </Link>
              </Grid>
            ))}
          </Grid>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredByMedicalUsage.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default MedicineList;
