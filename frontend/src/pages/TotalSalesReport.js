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

const TotalSalesReport = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const url = `http://localhost:8001/admin/ordersbymonth`;
        console.log('API Endpoint:', url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data);
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTotalSales();
  }, [selectedMonth]);

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h1>Total Sales Report</h1>

      <TextField
        label="Select Month"
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Medicinal Usage</TableCell>
              <TableCell>Quantity Sold</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine, index) => (
              <TableRow key={index}>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.description}</TableCell>
                <TableCell>{medicine.medicinalUsage}</TableCell>
                <TableCell>{medicine.quantitySold}</TableCell>
                <TableCell>{medicine.price}</TableCell>
                <TableCell>{medicine.discount}</TableCell>
                <TableCell>{new Date(medicine.date).toLocaleDateString('en-US', { month: 'long' })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TotalSalesReport;
