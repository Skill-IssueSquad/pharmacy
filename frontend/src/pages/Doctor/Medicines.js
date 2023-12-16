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
import { Cart } from "../../components/Cart";

const MultiLevelFilterTable = () => {
  const params = new URLSearchParams(window.location.search);
  const prescriptionID = params.get("prescriptionID");
  const appID = params.get("appID");
  console.log(prescriptionID);
  console.log(appID);
  const [filter, setFilter] = useState({
    medicineName: "",
    medicinalUsage: "",
  });
  const [data, setData] = useState([]); // Store the fetched data
  const [hashMap, setHashMap] = useState({});
  const [message, setMessage] = useState("");
  const [additionalMedicines, setAdditionalMedicines] = useState("");
  useEffect(() => {
    // Fetch the data when the component mounts
    fetchMedicines();
    // setMedicinesStatus();
  }, []);

  const setMedicinesStatus = async (tmpData) => {
    const response = await fetch(
      "http://localhost:8000/doctor/getMedicinesStatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          appID,
        }),
      }
    );
    const responseData = await response.json();
    const json = responseData.data;
    console.log("The data before state updating is : ", json);
    setAdditionalMedicines(responseData.additionalMedicines);
    console.log(json);
    const updatedData = [...tmpData];
    console.log("The data inside updating is : ", updatedData);
    if (json.success) {
      if (json.data != null) {
        updatedData.map((item) => {
          json.data.map((medicine) => {
            if (medicine.medicineID === item._id) {
              //updateHashMap(item._id, medicine.dose);
              item.givenDose = medicine.dose;
            }
          });
        });
      }
      updatedData.map((item) => {
        if (item.givenDose === undefined) {
          item.givenDose = "";
        }
      });
      updatedData.sort((a, b) => {
        if (a.givenDose !== "" && b.givenDose === "") {
          return -1;
        }
        if (a.givenDose === "" && b.givenDose !== "") {
          return 1;
        }
        return 0;
      });
      setData(updatedData);
      console.log("The data after updating is : ", data);
    } else {
      setMessage(json.message);
    }
  };

  const updateHashMap = (key, value) => {
    setHashMap((prevHashMap) => {
      const updatedHashMap = { ...prevHashMap };

      updatedHashMap[key] = value;

      return updatedHashMap;
    });
  };

  const handleInput = (event, itemId, maxQuantity) => {
    updateHashMap(itemId, event.target.value);
  };

  const fetchMedicines = async () => {
    try {
      console.log("HERE:");
      const response = await fetch("http://localhost:8001/medicine", {
        credentials: "include",
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      console.log("Fetched data:", json);

      // Store the fetched data in the 'data' state
      setData(json);
      console.log("The data before state updating is : ", json);

      await setMedicinesStatus(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const tableHeaders = [
    "medicineName",
    "picture",
    "Status",
    "Dose",
    "Dose Given",
    "Add to the prescription",
    "Remove from the prescription",
  ];

  const filteredData = data.filter((item) => {
    const { medicineName, medicinalUsage } = filter;
    return (
      item.medicineName.toLowerCase().includes(medicineName.toLowerCase()) &&
      item.medicinalUsage.toLowerCase().includes(medicinalUsage.toLowerCase())
    );
  });

  const handelSubmitToPharmacy = async () => {
    const myMedicines = [];
    data.map((item) => {
      if (item.givenDose !== "") {
        myMedicines.push(item);
      }
    });
    console.log(myMedicines);
    const response = await fetch("/doctor/createPatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        appID,
        myMedicines,
      }),
    });
    const json = await response.json();
    setMessage(json.message);
  };
  const handelAddToThePrescription = async (medicine) => {
    const id = medicine._id;
    const dose = hashMap[id];
    if (dose === undefined || dose === 0 || dose === "") return;
    console.log(medicine);
    console.log(dose);
    const response = await fetch(
      "http://localhost:8000/doctor/addToPrescription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          appID,
          medicineName: medicine.medicineName,
          dose,
          medicineID: id,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      const updatedData = [...data];
      updatedData.map((item) => {
        if (item._id === medicine._id) {
          item.givenDose = dose;
          hashMap[item._id] = "";
        }
      });
      updatedData.sort((a, b) => {
        if (a.givenDose !== "" && b.givenDose === "") {
          return -1;
        }
        if (a.givenDose === "" && b.givenDose !== "") {
          return 1;
        }
        return 0;
      });
      setData(updatedData);
    }
    setMessage(json.message);
  };
  const handelRemoveFromThePrescription = async (medicine) => {
    const response = await fetch(
      "http://localhost:8000/doctor/removeFromPrescription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          appID,
          medicineID: medicine._id,
        }),
      }
    );
    console.log("*****************************************", medicine._id);
    const json = await response.json();
    if (json.success) {
      const updatedData = [...data];
      updatedData.map((item) => {
        if (item._id === medicine._id) {
          item.givenDose = "";
        }
      });
      updatedData.sort((a, b) => {
        if (a.givenDose !== "" && b.givenDose === "") {
          return -1;
        }
        if (a.givenDose === "" && b.givenDose !== "") {
          return 1;
        }
        return 0;
      });
      setData(updatedData);
    }
    setMessage(json.message);
  };
  const handelSaveAdditionalMedicines = async () => {
    const response = await fetch(
      "http://localhost:8000/doctor/saveAdditionalMedicines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          appID,
          additionalMedicines,
        }),
      }
    );
    const json = await response.json();
    setMessage(json.message);
  };
  return (
    <div>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            label="Filter by medicineName"
            name="medicineName"
            value={filter.medicineName}
            onChange={handleFilterChange}
          />

          <button
            style={{ marginLeft: "50px" }}
            onClick={handelSubmitToPharmacy}
          >
            <a>Submit to the Pharmacy</a>
          </button>
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>{message}</h3>
          <TableContainer component={Paper}>
            <Table style={{ width: "1500px", height: "1000px" }}>
              <TableHead sx={{ padding: "64px" }}>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell key={header} sx={{ padding: "64px" }}>
                      {header}{" "}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item._id["$oid"]}>
                    <TableCell style={{ textAlign: "center" }}>
                      {item.medicineName}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <img src={item.picture} width="100px"></img>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {item.quantity > 0 ? "Available" : "Out of Stock"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <input
                        type="text"
                        id={`quantity-${item.id}`}
                        name="quantity"
                        onInput={(e) => handleInput(e, item._id, item.quantity)}
                        value={hashMap[item._id] || ""}
                      />
                    </TableCell>{" "}
                    <TableCell style={{ textAlign: "center" }}>
                      {item.givenDose}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => handelAddToThePrescription(item)}
                        disabled={item.quantity === 0}
                      >
                        Add to the prescription
                      </button>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => handelRemoveFromThePrescription(item)}
                        disabled={item.givenDose === ""}
                      >
                        Remove from the prescription
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h3>Additional medicines</h3>
          <textarea
            name="meds"
            id="additionalMeds"
            cols="30"
            rows="10"
            style={{ width: "1000px", height: "200px" }}
            value={additionalMedicines}
            onChange={(e) => setAdditionalMedicines(e.target.value)}
          ></textarea>
          <button
            onClick={handelSaveAdditionalMedicines}
            style={{ marginLeft: "50px" }}
          >
            Save additional medicines
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiLevelFilterTable;
