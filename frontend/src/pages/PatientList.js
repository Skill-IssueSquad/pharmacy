import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Navbar from "../components/navBarPharmacist";

const PatList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  useEffect(() => {
    const f = async () => {
      setLoading(true);
      const response = await fetch("/doctor/chat/getPatients", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setPatients(data.data);
      setLoading(false);
    };
    f();
  }, []);
  const chat = (patient) => {
    navigate("/Chat", { state: { username: patient.username } });
  };

  return (
    <div>
      <Navbar button={"Chat with Patient"}/>
      <h1 style={{marginLeft: 500}}>Chat with patients</h1>
      <div style={{ maxWidth: 300 }}>
        <TableContainer component={Paper} style={{marginLeft:500}}>
          <Table sx={{ maxWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pharmacist Name</TableCell>
                <TableCell>Chat</TableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <TableBody>
                {patients.map((patient) => (
                  <TableRow
                    key={patient._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => chat(patient)}
                      >
                        Chat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PatList;
