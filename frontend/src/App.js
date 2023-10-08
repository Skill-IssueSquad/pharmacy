import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MedicineList from "./pages/medicines";
import Navbar from './components/Navbar';
import MedicineSales from './pages/Sales';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={< Home/>} />
        <Route exact path="/pharmacist/medicines" element={<MedicineList />} />
        <Route exact path="/pharmacist/medicines/sales" element={<MedicineSales/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
