import AppBar from "./components/appBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientHome from "./pages/patientHome";
import MedicineList from "./pages/MedicineList";
import MedicineSales from "./pages/Sales";
import AddMedicine from "./pages/addmedicine";
import UpdateMedicine from "./pages/updatemedicine";
//import Home from "./pages/Home";
import Admin from "./pages/Admin/Admin";
import AdminChangePassword from "./pages/Admin/ChangePassword";
import ViewAdmins from "./pages/Admin/ViewAdmins";
import ViewPatients from "./pages/Admin/ViewPatients";
import ViewPharmacists from "./pages/Admin/ViewPharmacists";
import ViewProfile from "./pages/Admin/ViewProfile";
import ViewRequests from "./pages/Admin/ViewRequests";

import MedicinesForAdmin from "./pages/MedicinesForAdmin";
import ViewAccsInfo from "./pages/ViewAccsInfo";
import ViewPharmReq from "./pages/viewPharmReq";
import SalesReport from "./pages/SalesReport";
import MonthlySalesReport from "./pages/MonthlySalesReport";
import MonthlySalesReportForAdmin from "./pages/MonthlySalesReportForAdmin";

import PatientRegisteration from "./pages/Home/PatientRegisteration";
import PharmacistRegisteration from "./pages/Home/PharmacistRegisteration";
import MultiLevelFilterTable from "./components/test";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderDetails from "./components/OrderDetails";
import navBarC from "./components/navBarC";
import Login from "./pages/Home/Login";
import ForgotPassword from "./pages/Home/ForgotPassword";
import ResetPassword from "./pages/Home/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import AlternativesView from "./components/Alternatives";

import PharmacistRequest from "./pages/PharmacistRequest/PharmacistRequest";
import Medicines from "./pages/Doctor/Medicines";
import PharmacistList from "./pages/PharmacistList";
import Chat from "./pages/Chat";
import PatList from "./pages/PatientList";
import DocList from "./pages/DoctorList";
import DocChat from "./pages/DoctorChat ";
function App() {
  return (
    <div
      className="app"
      style={{ backgroundColor: "#f0f0f0", minHeight: "727px" }}
    >
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route
              path="/PharmacistRegisteration"
              element={<PharmacistRegisteration />}
            />
            <Route
              path="/PatientRegisteration"
              element={<PatientRegisteration />}
            />
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
            <Route exact path="/Admin" element={<Admin />} />
            <Route
              exact
              path="/Admin/ChangePassword"
              element={<AdminChangePassword />}
            />
            <Route exact path="/Admin/ViewAdmins" element={<ViewAdmins />} />
            <Route
              exact
              path="/Admin/ViewPatients"
              element={<ViewPatients />}
            />
            <Route
              exact
              path="/Admin/ViewPharmacists"
              element={<ViewPharmacists />}
            />
            <Route
              exact
              path="/Admin/ViewRequests"
              element={<ViewRequests />}
            />
            <Route exact path="/Admin/ViewProfile" element={<ViewProfile />} />
            <Route exact path="/Chat" element={<Chat />} />
            <Route exact path="/PatientList" element={<PatList />} />
            <Route exact path="/DoctorList" element={<DocList />} />
            <Route
              exact
              path="/PharmacistRequest"
              element={<PharmacistRequest />}
            />
            <Route exact path="/chatPharm" element={<PharmacistList />} />
            <Route exact path="/chatDoctor" element={<DocChat />} />
            <Route
              exact
              path="/admin/medicines"
              element={<MedicinesForAdmin />}
            />
            <Route
              exact
              path="/admin/monthlysalesreport"
              element={<MonthlySalesReportForAdmin />}
            />
            <Route exact path="admin/viewAccounts" element={<ViewAccsInfo />} />
            <Route
              exact
              path="/admin/viewPharmacistRequests"
              element={<ViewPharmReq />}
            />
            <Route
              exact
              path="/pharmacist/medicines/salesreport"
              element={<SalesReport />}
            />
            <Route
              exact
              path="/pharmacist/medicines/monthlysalesreport"
              element={<MonthlySalesReport />}
            />
            <Route
              exact
              path="/medicinePatient"
              element={<MultiLevelFilterTable />}
            />
            <Route exact path="/Cart" element={<Cart />} />
            <Route exact path="/Checkout" element={<Checkout />} />
            <Route exact path="/orderDetails" element={<OrderDetails />} />
            <Route
              exact
              path="/Doctor/Prescription"
              element={<Medicines />}
            />{" "}
            <Route
              exact
              path="/viewAlternatives"
              element={<AlternativesView />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
