import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientHome from "./pages/patientHome";
import MedicineList from "./pages/MedicineList";
import MedicineSales from "./pages/Sales";
import AddMedicine from "./pages/addmedicine";
import UpdateMedicine from "./pages/updatemedicine";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import MedicinesForAdmin from "./pages/MedicinesForAdmin";
import ViewAccsInfo from "./pages/ViewAccsInfo";
import ViewPharmReq from "./pages/viewPharmReq";
import PatientRegisteration from "./pages/PatientRegisteration";
import PharmacistRegisteration from "./pages/PharmacistRegisteration";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/patient" element={<PatientHome />} />
            <Route
              exact
              path="/pharmacist/medicines"
              element={<MedicineList />}
            />
            <Route
              exact
              path="/pharmacist/medicines/sales"
              element={<MedicineSales />}
            />
            <Route
              exact
              path="/pharmacist/medicines/addmedicine"
              element={<AddMedicine />}
            />
            <Route
              exact
              path="/pharmacist/medicines/updatemedicine/:medicineId"
              element={<UpdateMedicine />}
            />
            <Route exact path="/admin" element={<Admin />} />
            <Route
              exact
              path="/admin/medicines"
              element={<MedicinesForAdmin />}
            />
            <Route exact path="admin/viewAccounts" element={<ViewAccsInfo />} />
            <Route
              exact
              path="/admin/viewPharmacistRequests"
              element={<ViewPharmReq />}
            />

            <Route
              exact
              path="/patientRegisteration"
              element={<PatientRegisteration />}
            />

            <Route
              exact
              path="/pharmacistRegisteration"
              element={<PharmacistRegisteration />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
