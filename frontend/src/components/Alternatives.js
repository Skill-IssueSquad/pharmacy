// AlternativesView.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./navBarC";

// Custom Component for Medicine Item
const MedicineItem = ({ alternative }) => (
  <div
    style={{
      border: "1px solid #ddd",
      padding: "20px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      background: "#f8f8f8",
    }}
  >
    <div style={{ flex: "1" }}>
      <h2>{alternative.medicineName}</h2>
      <p>
        <strong>Medicinal Usage:</strong> {alternative.medicinalUsage}
      </p>
      <p>
        <strong>Description:</strong> {alternative.description}
      </p>
      <ul>
        {alternative.activeIngredients.map((ingredient) => (
          <li key={ingredient._id}>
            <p>
              <strong>Ingredient Name:</strong> {ingredient.ingredientName}
            </p>
            <p>
              <strong>Ingredient Amount:</strong> {ingredient.ingredientAmount}
            </p>
          </li>
        ))}
      </ul>
      <p>
        <strong>Price:</strong> {alternative.price}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {alternative.quantity > 0 ? "Available" : "Out of Stock"}
      </p>
    </div>
    <div style={{ flex: "1", marginLeft: "20px" }}>
      <img
        src={alternative.picture}
        alt={alternative.picture}
        style={{ width: "100%", maxWidth: "200px", height: "auto" }}
      />
    </div>
  </div>
);

const AlternativesView = () => {
  const username = "regtest";
  const navigate = useNavigate();
  const location = useLocation();
  const { medicineName } = location.state;

  const [alternatives, setAlternatives] = useState([]);
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([]);

  useEffect(() => {
    // Fetch alternatives data from the server
    fetchAlternatives();
  }, []);

  const fetchAlternatives = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/pharmacist/medicines/viewAlternative",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicineName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAlternatives(data.data);
    } catch (error) {
      console.error("Error Fetching alternative medicines:", error);
    }
  };

  useEffect(() => {
    const getPrescriptionMedicines = async (username) => {
      try {
        const response = await fetch(
          "http://localhost:8000/getPrescription/sendPrescriptionMedicinesToPharmacy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPrescriptionMedicines(data.data);
      } catch (error) {
        console.error("Error getting prescription medicines:", error);
      }
    };

    getPrescriptionMedicines(username);
  }, []);

  const addToCartA = (id, medicineName, prescription) => {
    if (prescription) {
      console.log("ana fe prescription");
      if (prescriptionMedicines.length === 0) {
        alert("You need a prescription to buy this medicine");
        return;
      }
      for (let i = 0; i < prescriptionMedicines.length; i++) {
        if (prescriptionMedicines[i].medicineName === medicineName) break;
        else if (i === prescriptionMedicines.length - 1) {
          alert("You need a prescription to buy this medicine");
          return;
        }
      }
    }

    console.log("username:" + username, "id:" + id);
    fetch("http://localhost:8001/patient/addAlternative", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          //  alert(" Medicine Added to Cart Suceesfully");

          return response.json();
        } else {
          //  alert(" Medicine Added to Cart Suceesfully");

          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        //console.log("I am here");
      })
      .catch((error) =>
        console.error("Error Adding Alternative Medicine to Pharmacy:", error)
      );
    fetchAlternatives();
  };

  return (
    <div>
      <ResponsiveAppBar />
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Alternative Medicines for {medicineName}
      </h1>
      {alternatives.map((alternative) => (
        <div key={alternative.id} style={{ marginBottom: "20px" }}>
          <MedicineItem alternative={alternative} />
          <div style={{ textAlign: "left", margin: "10px 0" }}>
            <button
              onClick={() =>
                addToCartA(
                  alternative._id,
                  alternative.medicineName,
                  alternative.requiresPrescription
                )
              }
              style={{ marginBottom: "3px", marginTop: "3px" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlternativesView;
