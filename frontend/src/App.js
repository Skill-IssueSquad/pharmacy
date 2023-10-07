import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pharamacist_Medicine from "./pages/Pharmacist_Medicine";
import MultiLevelFilterTable from "./components/test";
import MedicineList from "./components/medicines";
import MedicineDetails from "./pages/medicineDetails";
import Table from "./components/Table";
import MedicineSales from './pages/Sales';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={< MedicineSales/>} />
        <Route exact path="/pharmacist/medicines" element={<MedicineList />} />
        <Route exact path="/pharmacist/medicines/:medicine" element={<MedicineDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
