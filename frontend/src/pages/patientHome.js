import MedicinePatients from "../components/medicinePatient";
import SearchComponent from "../components/SearchComponent";
import SearchComponentMedicalUse from "../components/SearchComponentMedicalUse";
import MultiLevelFilterTable from "../components/test";
import { auth } from "./Protected/AuthProvider";

import { useState } from "react";

const PatientHome = () => {
  let show = false;

  console.log(auth());
  if(auth() && localStorage.getItem('role')==="Patient"){
      show = true;
  }

  const [filteredMedicines, setFilteredMedicines] = useState([]);

  const updateFilteredMedicines = (filteredData) => {
    setFilteredMedicines(filteredData);
  };

  return (
    <div>
    {show? (
      <div className="home">

        <MultiLevelFilterTable />
      </div>) :
       (<h2>No access</h2>)
      }
    </div>
  );
};

export default PatientHome;
