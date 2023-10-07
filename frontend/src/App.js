import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pharamacist_Medicine from "./pages/Pharmacist_Medicine";
import MultiLevelFilterTable from "./components/test";
import MedicineList from "./components/medicines";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MedicineList />} />
        <Route exact path="/pharmacist/medicines" element={<Pharamacist_Medicine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
