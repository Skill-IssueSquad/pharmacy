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
import Navbar from '../components/navBarPharmacist';

const MonthlySalesReport = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const url = `http://localhost:8001/admin/ordersbymonth?month=${selectedMonth}`;
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

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div >
      <Navbar button={"Monthly Sales Report"}/>
      <h1>Total Sales Report</h1>

      <TextField
        label="Select Month"
        type="month"
        value={selectedMonth}
        onChange={handleMonthChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine Name</TableCell>
              <TableCell>Quantity Sold</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Month</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine, index) => (
              <TableRow key={index}>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.quantity}</TableCell>
                <TableCell>{medicine.totalPrice}</TableCell>
                <TableCell>
                  {new Date(medicine.date).toLocaleDateString('en-US', {
                    month: 'long',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MonthlySalesReport;