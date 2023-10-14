import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientHome from "./pages/patientHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/patient" element={<PatientHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
