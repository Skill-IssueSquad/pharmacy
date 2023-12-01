// AlternativesView.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AlternativesView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { medicineName } = location.state;

  console.log("Medicines hna ya cap: " + medicineName);
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    // Fetch alternatives data from the server
    fetchAlternatives();
  }, []);

  const fetchAlternatives = async () => {
    try {
      const response = await fetch('http://localhost:8001/pharmacist/medicines/viewAlternative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          medicineName,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAlternatives(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('Error Fetching alternative medicines:', error);
    }
  };

  return (
    <div>
      <h1>View Alternatives</h1>
      {alternatives.map((alternative) => (
        <div key={alternative.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', display: 'flex' }}>
          <div style={{ flex: '1' }}>
            <h2>Medicine Name: {alternative.medicineName}</h2>
            <p>Medicinal Usage: {alternative.medicinalUsage}</p>
            <p>Description: {alternative.description}</p>
            <ul>
                  {alternative.activeIngredients.map((ingredient) => (
                    <li key={ingredient._id}>
                      <p>Ingredient Name: {ingredient.ingredientName}</p>
                      <p>Ingredient Amount: {ingredient.ingredientAmount}</p>
                    </li>
                  ))}
            </ul>
            <p>Price: {alternative.price}</p>
            <p>Status: {alternative.quantity > 0 ? 'Available' : 'Out of Stock'}</p>
            

           
          </div>
          <div style={{ flex: '1', marginLeft: '20px' ,marginTop:'140px'}}>
            <img src={alternative.picture} alt={alternative.picture} style={{ width: '100px', height: '100px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlternativesView;
