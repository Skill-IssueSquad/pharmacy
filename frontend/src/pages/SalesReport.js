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
        const response = await fetch(`http://localhost:8001/admin/rescentorders?search=${searchTerm}`);
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMedicines();
  }, [searchTerm]);

  return (
    <div className="search_and_filter" style={{ padding: '20px' }}>
      <Navbar />
      <h1>Medicine Sales</h1>

      <TextField
        label="Select day"
        type="date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
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
              <TableRow key={medicine.medicine_id + '_' + medicine.date}>
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
