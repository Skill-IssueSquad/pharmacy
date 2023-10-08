import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MultiLevelFilterTable from "./components/test";
import MedicineList from "./pages/medicines";

import MedicineSales from './pages/Sales';
import AddMedicine from './pages/addmedicine';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={< Home/>} />
        <Route exact path="/pharmacist/medicines" element={<MedicineList />} />
        <Route exact path="/pharmacist/medicines/sales" element={<MedicineSales/>} />
        <Route exact path="/pharmacist/medicines/addmedicine" element={<AddMedicine/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;