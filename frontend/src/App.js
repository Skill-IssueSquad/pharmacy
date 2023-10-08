import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MedicineList from "./pages/MedicineList";
import Navbar from './components/Navbar';
import MedicineSales from './pages/Sales';
import AddMedicine from './pages/addmedicine';
import UpdateMedicine from './pages/updatemedicine';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route exact path="/" element={< Home/>} />
        <Route exact path="/pharmacist/medicines" element={<MedicineList />} />
        <Route exact path="/pharmacist/medicines/sales" element={<MedicineSales/>} />
        <Route exact path="/pharmacist/medicines/addmedicine" element={<AddMedicine/>} />
        <Route exact path="/pharmacist/medicines/updatemedicine/:medicineId" element={<UpdateMedicine/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
