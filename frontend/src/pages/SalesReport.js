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
import { format } from 'date-fns';

const SalesReport = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const formattedDate = dateFilter ? format(new Date(dateFilter), 'MM/dd/yyyy') : '';

    const fetchMedicines = async () => {
      try {
        const url = `http://localhost:8001/admin/orders?date=${formattedDate}`;
        console.log('API Endpoint:', url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data);

        // Filter medicines based on the search term and date
        const filteredMedicines = data.filter(
          (medicine) => {
            const medicineDate = new Date(medicine.date).toLocaleDateString();
            console.log('Medicine Date:', medicineDate);
            console.log('Formatted Date:', formattedDate);
            console.log('Date Comparison:', medicineDate === formattedDate);
        
            return (
              medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (formattedDate === '' || medicineDate === formattedDate)
            );
          }
        );
        setMedicines(filteredMedicines);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMedicines();
  }, [searchTerm, dateFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  return (
    <div className="search_and_filter" style={{ padding: '20px' }}>
      <Navbar />
      <h1>Medicine Sales</h1>

      <TextField
        label="Search Medicine Name"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', marginRight: '20px' }}
      />

      <TextField
        label="Select day"
        type="date"
        value={dateFilter}
        onChange={handleDateChange}
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
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.medicine_id + '_' + medicine.date}>
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
