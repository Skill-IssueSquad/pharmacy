// SalesReport.js

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import Navbar from '../components/Navbar';

const SalesReport = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // Adjust the API endpoint to include the search parameter
        const response = await fetch(`http://localhost:8001/admin/rescentorders?search=${searchTerm}`);
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMedicines();
  }, [searchTerm]); // Add searchTerm as a dependency to re-fetch when it changes

  return (
    <div className="search_and_filter" style={{ padding: '20px' }}>
      <Navbar />
      <h1>Medicine Sales</h1>

      {/* Add input field for search by medicine name */}
      <TextField
        label="Search by Medicine Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine ID</TableCell>
              <TableCell>Medicine Name</TableCell>
              <TableCell>Quantity Sold</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.medicineId}>
                <TableCell>{medicine.medicine_id}</TableCell>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.quantity}</TableCell>
                <TableCell>{medicine.totalPrice}</TableCell>
                <TableCell>{medicine.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SalesReport;
