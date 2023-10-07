import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const dummyData = [
  {
    id: 1,
    name: 'Medicine 1',
    price: '$10',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://example.com/medicine1.jpg',
  },
  {
    id: 2,
    name: 'Medicine 2',
    price: '$15',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://example.com/medicine2.jpg',
  },
  // Add more dummy data here
];

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh', // Adjust the container size
    },
    card: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
      
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9 aspect ratio for the image
    },
    heading: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '0.5rem 0',
    },
    description: {
      fontSize: '0.9rem',
      marginBottom: '0.3rem', // Adjust the margin to reduce space
    },
    price: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
  };
  

const MedicineList = () => {
  return (
    <div style={styles.container}>
      <Grid container spacing={10}>
        {dummyData.map((medicine) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={medicine.id}>

            <Link to={`/medicine/${medicine.id}`} style={{ textDecoration: 'none' }}>
              <Card style={styles.card}>
                <CardMedia
                  component="img"
                  alt={medicine.name}
                  image={medicine.imageUrl}
                  style={styles.media}
                />
                <CardContent>
                  <Typography style={styles.heading} variant="h6" component="div">
                    {medicine.name}
                  </Typography>
                  <Typography style={styles.description} variant="body2" color="textSecondary">
                    {medicine.description}
                  </Typography>
                  <Typography style={styles.price} variant="h6" component="div">
                    {medicine.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MedicineList;
