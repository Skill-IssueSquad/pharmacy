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
  const [medicineSearchTerm, setMedicineSearchTerm] = useState('');

  useEffect(() => {
    const formattedDate = searchTerm;

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

        // Filter medicines based on the search term and medicine name
        const filteredMedicines = data.filter(
          (medicine) =>
            medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            medicine.medicineName.toLowerCase().includes(medicineSearchTerm.toLowerCase())
        );

        setMedicines(filteredMedicines);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMedicines();
  }, [searchTerm, medicineSearchTerm]);

  const handleDateChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMedicineSearchChange = (e) => {
    setMedicineSearchTerm(e.target.value);
  };

  return (
    <div className="search_and_filter" style={{ padding: '20px' }}>
      <Navbar />
      <h1>Medicine Sales</h1>

      <TextField
        label="Select day"
        type="date"
        value={searchTerm}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginRight: '20px' }}
      />

      <TextField
        label="Search Medicine Name"
        value={medicineSearchTerm}
        onChange={handleMedicineSearchChange}
        style={{ marginBottom: '20px' }}
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
