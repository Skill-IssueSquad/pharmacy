import { useState, useEffect } from "react";

const MedicinePatients = ({ medicines }) => {
  const [medicinesData, setMedicinesData] = useState(null);

  useEffect(() => {
    // If medicines prop is empty, fetch all medicines
    if (medicines.length === 0) {

      const fetchMedicines = async () => {
        try {
          const response = await fetch('http://localhost:8000/medicine');
          console.log('Response status:', response.status);
          console.log('Response status:', response);

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const json = await response.json();
          console.log('Fetched data:', json);
          setMedicinesData(json);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchMedicines();
    } else {
      // Use the medicines prop directly
      setMedicinesData(medicines);
    }
  }, [medicines]);


  return (
    <div className="home">
      {medicinesData !== null ? (
  medicinesData.map((medicine) => (
    <div key={medicine._id}>
            <p>Medicine Name: {medicine.medicineName}</p>
            <p>Description: {medicine.description}</p>
            <p>Medicinal Usage: {medicine.medicinalUsage}</p>
            {medicine.activeIngredients.length > 0 && (
              <div>
                <p>Active Ingredients:</p>
                <ul>
                  {medicine.activeIngredients.map((ingredient) => (
                    <li key={ingredient._id}>
                      <p>Ingredient Name: {ingredient.ingredientName}</p>
                      <p>Ingredient Amount: {ingredient.ingredientAmount}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>Medicine quantity: {medicine.quantity}</p>
            <p>Medicine price: {medicine.price}</p>
            <p>Medicine Picture: {medicine.picture.type}</p>
            <p>Medicine Picture: {medicine.picture.data}</p>
            <p>Medicine sales: {medicine.sales}</p>
            <p>Medicine isArchived: {medicine.isArchived}</p>
            <p>Medicine __v: {medicine.__v}</p>

            <br /><br /><br />

               
          </div>    
  ))
) : (
  <p>Loading...</p>
)}

    </div>
  );
};

export default MedicinePatients;
