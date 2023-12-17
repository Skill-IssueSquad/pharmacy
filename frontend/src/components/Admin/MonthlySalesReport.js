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
//import Navbar from '../components/Navbar';
import {Breadcrumbs, Link, Typography} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

const MonthlySalesReportForAdmin = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleClick = () => {
    {localStorage.setItem('selectedItem',"Dashboard")}
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="grey"
      href="/Admin"
      onClick={handleClick}
    >
    {<HomeIcon style={{color: 'blue', opacity: 0.5}}></HomeIcon>}
    </Link>,
    <Typography key="3" color="grey">
      View Sales Report
    </Typography>,
  ];


  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        
        const apiUrl = "http://localhost:8001/admin/ordersbymonth/";

        const response = await fetch(apiUrl, {method: 'GET' ,credentials: 'include'});
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const filteredData = data.filter(item => new Date(item.date).toLocaleDateString('en-US', {
            month: 'long',
          }) === selectedMonth);
        if(selectedMonth===''){
            setMedicines(data);
        }
        else{
            setMedicines(filteredData);
        }
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
    <div style={{ padding: '20px' }}>
  
    <a style={{fontFamily: 'Arial, sans-serif', fontSize: '20px',color: '#333', fontWeight:'bold'}}>Monthly Sales Report
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      </a>
      <br/>

      <TextField
        label="Select Month"
        type="month"
        value={selectedMonth}
        onChange={handleMonthChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <br/>
        <br/>
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

export default MonthlySalesReportForAdmin;