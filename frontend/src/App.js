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

import PharmacistRegistrationForm from "./components/pharmacistRegistrationForm";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="pages">
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
           <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/PharmacistRegisteration" element={<PharmacistRegistrationForm/>} />
            <Route path="/PatientRegisteration" element={<PatientRegisteration/>} />
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
             
              element={<MultiLevelFilterTable/>}
            />
             <Route
              exact
              path="/Cart"
              element={<Cart/>}
            />
              <Route
              exact
              path="/Checkout"
              element={<Checkout/>}
            />


             <Route
              exact
              path="/orderDetails"
              element={<OrderDetails/>}
            />
            
            <Route
              exact
              path="/viewAlternatives"
              element={<AlternativesView/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
