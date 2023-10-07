import { useEffect, useState } from "react";

import MedicineDetails from '../components/MedicineDetails'

const Home = () => {
  const [Medicines, setMedicine]= useState(null)

  useEffect(()=>{
    const fetchMedicines = async () => {
      const response =await fetch('/pharmacist/medicines')
      const json = await response.json()

      if (response.ok){
        setMedicine(json)
      }
    }
    fetchMedicines()
  }, [])
  return (
    <div className="home">
      <div className="medicines">
      {Medicines && Medicines.map((medicine) => {
        <MedicineDetails key={medicine._id} medicine={medicine}/>
      })}
      </div>
    </div>
  );
};

export default Home;
