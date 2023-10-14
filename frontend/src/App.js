import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import MedicinesForAdmin from "./pages/MedicinesForAdmin";
import ViewAccsInfo from "./pages/ViewAccsInfo";
import ViewPharmReq from "./pages/viewPharmReq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin/medicines" element={<MedicinesForAdmin />} />
        <Route exact path="admin/viewAccounts" element={<ViewAccsInfo />} />
        <Route
          exact
          path="/admin/viewPharmacistRequests"
          element={<ViewPharmReq />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
