import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios directly


const MedicineDetails = () => {
  const { medicine } = useParams();
  const [medicineData, setMedicineData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create an Axios instance for this component
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/pharmacist/',
    });

    // Fetch medicine details when the component mounts
    const fetchMedicineData = async () => {
      try {
        const response = await axiosInstance.get(`medicines/${medicine}`);
        setMedicineData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medicine data:', error);
      }
    };

    fetchMedicineData();
  }, [medicine]);

  if (loading) {
    // Show a loading indicator while data is being fetched
    return <p>Loading...</p>;
  }

  return (
    <div className="medicine-details">
    
      <div className="medicine-details-right">
        {/* Display medicine image here */}
        <img src={medicineData.data.picture} alt={medicineData.medicineName} />
      </div>
    </div>
  );
};

export default MedicineDetails;
