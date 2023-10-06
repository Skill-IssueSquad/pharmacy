import useAxios from "../useAxios";

const Pharamacist_Medicine = () => {
  const { success, message, data } = useAxios();

  // Check if data is available
  if (!success || !data) {
    return <div className="home">Loading...</div>;
  }

  console.log("Data:", data);

  // Access the first item in the data array
  const firstMedicine = data[0];

  return (
    <div className="home">
      <h4>{success}</h4>
      <p>Name of the first medicine: {firstMedicine.medicineName}</p>
      {/* Access other properties as needed */}
    </div>
  );
};

export default Pharamacist_Medicine;
