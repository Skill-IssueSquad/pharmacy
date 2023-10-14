import React, { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";

const PharmacistRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    realName: "",
    password: "",
    email: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliatedHospital: "",
    educationalBackground: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pharmacist = {
      username: formData.username,
      name: formData.realName,
      password: formData.password,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      hourlyRate: formData.hourlyRate,
      affiliatedHospital: formData.affiliatedHospital,
      educationalBackground: formData.educationalBackground,
    };

    console.log(formData);
    console.log(pharmacist);

    const response = await fetch("http://localhost:8000/register/pharmacist");

    const pharmacistData = await json(response);

    if (!response.ok) {
      setError(pharmacistData.message);
    } else {
      setError(null);

      setFormData({
        username: "",
        realName: "",
        password: "",
        email: "",
        dateOfBirth: "",
        hourlyRate: "",
        affiliatedHospital: "",
        educationalBackground: "",
      });

      console.log("Pharmacist Application Submitted Successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Real Name</label>
        <input
          type="text"
          name="realName"
          value={formData.realName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Hourly Rate</label>
        <input
          type="number"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Affiliated Hospital</label>
        <input
          type="text"
          name="affiliatedHospital"
          value={formData.affiliatedHospital}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Educational Background</label>
        <input
          type="text"
          name="educationalBackground"
          value={formData.educationalBackground}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PharmacistRegistrationForm;
