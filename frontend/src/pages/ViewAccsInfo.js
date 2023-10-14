import React from "react";
import ViewAccs from "../components/viewAccs";

const ViewAccsInfo = () => {
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
        API_GET_URL={"http://localhost:8000/admin/viewPatientInfo/"}
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
        API_GET_URL={"http://localhost:8000/admin/viewPharmacistInfo"}
      />
    </div>
  );
};

export default ViewAccsInfo;
