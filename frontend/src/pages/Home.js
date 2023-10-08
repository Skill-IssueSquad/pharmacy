import MedicinePatients from "../components/medicinePatient";
import SearchComponent from "../components/SearchComponent";
import SearchComponentMedicalUse from "../components/SearchComponentMedicalUse";
import MultiLevelFilterTable from "../components/test"

import { useState } from "react";

const Home = () => {
const [filteredMedicines, setFilteredMedicines] = useState([]);

  const updateFilteredMedicines = (filteredData) => {
    setFilteredMedicines(filteredData);
  };

  return (
    <div className="home">
      {/*<SearchComponent updateFilteredMedicines={updateFilteredMedicines} />
      <SearchComponentMedicalUse updateFilteredMedicines={updateFilteredMedicines} />
  <MedicinePatients medicines={filteredMedicines} />*/}
  
  <MultiLevelFilterTable />

    </div>
  );
};

export default Home;
