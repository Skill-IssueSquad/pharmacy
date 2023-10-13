import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const MultiLevelFilterTable = () => {
  const [filter, setFilter] = useState({ medicineName: "", medicinalUsage: "" });
  const [data, setData] = useState([]); // Store the fetched data
  const [sorting, setSorting] = useState({ field: "", order: "" });

  useEffect(() => {
    // Fetch the data when the component mounts
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      console.log("HERE:");
      const response = await fetch("http://localhost:8000/medicine");
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      console.log("Fetched data:", json);

      // Store the fetched data in the 'data' state
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSort = (field) => {
    if (field === sorting.field) {
      // Toggle sorting order
      setSorting({
        field,
        order: sorting.order === "asc" ? "desc" : "asc",
      });
      // Reverse the data array
      setData([...data].reverse());
    } else {
      // Set the field to sort and default order (asc)
      setSorting({
        field,
        order: "asc",
      });
      // Sort the data array by the selected field in ascending order
      setData([...data].sort((a, b) => {
        if (field === "_id") {
          // Special case for sorting by "_id"
          return a[field]["$oid"].localeCompare(b[field]["$oid"]);
        }
        return a[field].localeCompare(b[field]);
      }));
    }
  };
  
  const tableHeaders = [
    "medicineName",
    "description",
    "medicinalUsage",
    "activeIngredients",
    "price",
    "picture"
  ];

  const filteredData = data.filter((item) => {
    const { medicineName, medicinalUsage } = filter;
    return (
      item.medicineName.toLowerCase().includes(medicineName.toLowerCase()) &&
      item.medicinalUsage.toLowerCase().includes(medicinalUsage.toLowerCase())
    );
  });

  return (
    <div>
      <TextField
        label="Filter by medicineName"
        name="medicineName"
        value={filter.medicineName}
        onChange={handleFilterChange}
      />
      <TextField
        label="Filter by medicinalUsage"
        name="medicinalUsage"
        value={filter.medicinalUsage}
        onChange={handleFilterChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx = {{padding : "32px"}} >
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header}  sx = {{padding : "32px"}}>
                  {header}{" "}
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.map((item) => (
    <TableRow key={item._id["$oid"]}>
      <TableCell>{item.medicineName}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.medicinalUsage}</TableCell>
      <TableCell>
      <ul>
                  {item.activeIngredients.map((ingredient) => (
                    <li key={ingredient._id}>
                      <p>Ingredient Name: {ingredient.ingredientName}</p>
                      <p>Ingredient Amount: {ingredient.ingredientAmount}</p>
                    </li>
                  ))}
                </ul>
                </TableCell>

      <TableCell>{item.price}</TableCell>
     <TableCell ><img src = {item.picture } width = "100px"></img></TableCell>
      </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MultiLevelFilterTable;
