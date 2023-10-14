import React, { useState, useEffect } from "react";
import PharmacistRegisterationForm from "../components/pharmacistRegistrationForm";
import axios from "axios";
import { json } from "react-router-dom";

const PharmacistRegisteration = () => {
  const [pharmacists, setPharmacists] = useState(null);
  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/register/pharmacist"
        );

        if (response) {
          setPharmacists(response.data.data);
        } else {
          console.error("Failed to fetch pharmacist data");
        }
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    try {
      fetchPharmacists();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    //handle doctor data like patient data
    <div className="main page">
      <h1>Pharmacist Registeration</h1>

      <PharmacistRegisterationForm />

      <div>
        {pharmacists &&
          pharmacists.map((pharmacist) => (
            <div key={pharmacist._id}>
              <h3>{pharmacist.name}</h3>
              <p>{pharmacist.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PharmacistRegisteration;
