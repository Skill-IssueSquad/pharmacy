import React, { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";

const PharmacistRegistrationForm = () => {
 /* const [formData, setFormData] = useState({
    username: "",
    realName: "",
    password: "",
    email: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliatedHospital: "",
    educationalBackground: "",
  });
*/
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliatedHospital, setAffiliatedHospital] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");
  const [image, setImage] = useState();

  const [error, setError] = useState(null);
 /* const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };*/

  const handleSubmit = async (e) => {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('realName', realName);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('hourlyRate', hourlyRate);
    formData.append('affiliatedHospital', affiliatedHospital);
    formData.append('educationalBackground', educationalBackground);
    formData.append('image', image);

    e.preventDefault();
    /*const pharmacist = {
      username: formData.username,
      name: formData.realName,
      password: formData.password,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      hourlyRate: formData.hourlyRate,
      affiliatedHospital: formData.affiliatedHospital,
      educationalBackground: formData.educationalBackground,
    };
*/
    console.log(formData);
   // console.log(pharmacist);

    const response = await axios.post(
      "http://localhost:8000/register/pharmacist",
      formData
    );

    if (!response) {
      setError(response.message);
    } else {
      setError(null);

      setUsername("");
      setRealName("");
      setPassword("");
      setEmail("");
      setDateOfBirth("")
      setHourlyRate("");
      setAffiliatedHospital("");
      setEducationalBackground("");
      setImage(null);

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}

        />
      </div>
      <div>
        <label>Real Name</label>
        <input
          type="text"
          name="realName"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      <div>
        <label>Hourly Rate</label>
        <input
          type="number"
          name="hourlyRate"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
      </div>
      <div>
        <label>Affiliated Hospital</label>
        <input
          type="text"
          name="affiliatedHospital"
          value={affiliatedHospital}
          onChange={(e) => setAffiliatedHospital(e.target.value)}
        />
      </div>
      <div>
        <label>Educational Background</label>
        <input
          type="text"
          name="educationalBackground"
          value={educationalBackground}
          onChange={(e) => setEducationalBackground(e.target.value)}
        />
      </div>
      <div>
      <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PharmacistRegistrationForm;
