import React from "react";
import { useState, useEffect } from "react";
import ViewAccs from "../components/viewAccs";
import axios from "axios";

const ViewAccsInfo = () => {
  const [temp, setTemp] = useState(0); // This is a dummy state to force a re-render
  const removePatient = async (username) => {
    console.log("Here is the username:");
    console.log(username);
    try {
      const removedPatient = await axios.delete(
        `http://localhost:8001/admin/removePatient/${username}`
      );
      console.log("Here is the removed patient:");
      console.log(removedPatient);
      setTemp(temp + 1);
    } catch (error) {
      console.log("Here is the error:");
      console.log(error);
    }
  };

  const removePharmacist = async (username) => {
    try {
      const removedPharmacist = await axios.delete(
        `http://localhost:8001/admin/removePharmacist/${username}`
      );
      console.log("Here is the removed pharmacist:");
      console.log(removedPharmacist);
      setTemp(temp + 1);
    } catch (error) {
      console.log("Here is the error:");
      console.log(error);
    }
  };

  useEffect(() => {}, [removePatient, removePharmacist]);

  return (
    <div className="viewAccs">
      <h2>Viewing Patient Accounts </h2>
      <ViewAccs
        columns={[
          "username",
          "name",
          "email",
          "gender",
          "mobileNumber",
          "dateOfBirth",
          "walletBalance",
          "Remove",
        ]}
        API_GET_URL={"http://localhost:8001/admin/viewPatientInfo/"}
        removeFunc={removePatient}
      />
      <h2>Viewing Pharmacist Accounts </h2>
      <ViewAccs
        columns={[
          "username",
          "name",
          "email",
          "gender",
          "mobileNumber",
          "educationalBackground",
          "walletBalance",
          "affiliationHospital",
          "hourlyRate",
          "Remove",
        ]}
        API_GET_URL={"http://localhost:8001/admin/viewPharmacistInfo"}
        removeFunc={removePharmacist}
      />
    </div>
  );
};

export default ViewAccsInfo;
