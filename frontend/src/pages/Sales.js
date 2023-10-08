import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination, // Import TablePagination component
} from '@mui/material';
import { Link } from 'react-router-dom';

import useAxios from '../useAxios';
import { useEffect } from 'react';

const MedicineSales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMedicalUsage, setFilterMedicalUsage] = useState('');
  const [dummyData, setDummyData] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const {medicines} = useAxios('http://localhost:8000/pharmacist/medicines');

  // Update dummyData with fetched data whenever medicinesResponse changes
  useEffect(() => {
    // Extract the data array from the response
    if (medicines.data && Array.isArray(medicines.data)) {
      setDummyData(medicines.data);
    }
  }, [medicines]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterMedicalUsage(event.target.value);
  };

  const calculateMinWidth = (contentArray) => {
    return contentArray.reduce((maxWidth, content) => {
      const contentWidth = content.length * 8; // Assuming 8px per character width
      return contentWidth > maxWidth ? contentWidth : maxWidth;
    }, 100); // 100px minimum width
  };

  // Calculate minimum widths for each column based on content
  const minWidths = {
    medicineName: calculateMinWidth(
      dummyData.map((medicine) => medicine.medicineName)
    ),
    description: calculateMinWidth(
      dummyData.map((medicine) => medicine.description)
    ),
    medicinalUsage: calculateMinWidth(
      dummyData.map((medicine) => medicine.medicinalUsage)
    ),
    price: calculateMinWidth(
      dummyData.map((medicine) => medicine.price.toString())
    ),
    sales: calculateMinWidth(
      dummyData.map((medicine) => medicine.sales.toString())
    ),
    quantity: calculateMinWidth(
      dummyData.map((medicine) => medicine.quantity.toString())
    ),
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
{medicines && <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: minWidths.medicineName }}>
                Medicine Name
              </TableCell>
              <TableCell style={{ minWidth: minWidths.description }}>
                Description
              </TableCell>
              <TableCell style={{ minWidth: minWidths.medicinalUsage }}>
                Medical Usage
              </TableCell>
              <TableCell style={{ minWidth: minWidths.price }}>Price</TableCell>
              <TableCell style={{ minWidth: minWidths.sales }}>Sales</TableCell>
              <TableCell style={{ minWidth: minWidths.quantity }}>
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((medicine) => (
              <TableRow key={medicine._id}>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.description}</TableCell>
                <TableCell>{medicine.medicinalUsage}</TableCell>
                <TableCell>{medicine.price}</TableCell>
                <TableCell>{medicine.sales}</TableCell>
                <TableCell>{medicine.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredByMedicalUsage.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
            </div>}
    </div>
  );
};

export default MedicineSales;
