import { useState } from "react";

const SearchComponent = ({ updateFilteredMedicines }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8001/medicine/searchByName/${searchQuery}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch filtered data");
      }

      const json = await response.json();
      
      // Call the callback function to update filteredMedicines in Home component
      updateFilteredMedicines(json);

    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  return (
    <div>
      <h3>Search By Name</h3>
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
