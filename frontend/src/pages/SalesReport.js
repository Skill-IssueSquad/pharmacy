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
import { format } from 'date-fns';

const SalesReport = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const url = `http://localhost:8001/admin/orders`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const filteredMedicines = data.filter((medicine) => {
          const medicineDate = new Date(medicine.date);
        
          // Convert date to string in the format 'yyyy-mm-dd'
          const formattedMedicineDate = medicineDate.toLocaleDateString('en-CA');
        
          return (
            medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!selectedDate || formattedMedicineDate === selectedDate)
          );
        });
        setMedicines(filteredMedicines);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMedicines();
  }, [searchTerm, selectedDate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="search_and_filter" >
      <Navbar button={"Sales Report"}/>
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
        value={selectedDate}
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
