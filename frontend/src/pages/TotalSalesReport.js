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
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await fetch('http://localhost:8001/admin/orders');
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTotalSales();
  }, []); // No dependencies, fetch once when the component mounts

  useEffect(() => {
    // Filter medicines based on the selected day
    if (selectedDay) {
      const filteredData = medicines.filter(
        (medicine) => new Date(medicine.date).toLocaleDateString() === selectedDay
      );
      setFilteredMedicines(filteredData);
    } else {
      setFilteredMedicines(medicines);
    }
  }, [selectedDay, medicines]);

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h1>Total Sales Report</h1>

      {/* Add a TextField for selecting the day */}
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
            {filteredMedicines.map((medicine, index) => (
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
