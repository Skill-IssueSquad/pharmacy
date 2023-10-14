import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientHome from "./pages/patientHome";
import MedicineList from "./pages/MedicineList";
import MedicineSales from './pages/Sales';
import AddMedicine from './pages/addmedicine';
import UpdateMedicine from './pages/updatemedicine';
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={< Home/>} />
        <Route exact path="/patient" element={<PatientHome />} />
        <Route exact path="/pharmacist/medicines" element={<MedicineList />} />
        <Route exact path="/pharmacist/medicines/sales" element={<MedicineSales/>} />
        <Route exact path="/pharmacist/medicines/addmedicine" element={<AddMedicine/>} />
        <Route exact path="/pharmacist/medicines/updatemedicine/:medicineId" element={<UpdateMedicine/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
