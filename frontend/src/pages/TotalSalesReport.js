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
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        // Adjust the API endpoint to include the filter parameter
        const response = await fetch(`http://localhost:8001/admin/orders?day=${selectedDay}`);
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTotalSales();
  }, [selectedDay]); // Add selectedDay as a dependency to re-fetch when it changes

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h1>Total Sales Report</h1>

      {/* Add TextField for selecting the day */}
      <TextField
        label=" "
        type="date"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        style={{ marginBottom: '20px' }}
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
                <TableCell>{new Date(medicine.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TotalSalesReport;
