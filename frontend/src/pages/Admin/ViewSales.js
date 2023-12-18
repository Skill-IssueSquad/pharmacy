import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import MonthlySalesReport from "../../components/Admin/MonthlySalesReport";
import { auth } from "../Protected/AuthProvider";



const ViewRequests = () => {
    let show = false;

    if(auth() && localStorage.getItem('role')==="Admin"){
        show = true;
    }

    return (
        <div>
        {show &&  <AdminSideBar flag = {false} ViewComponent={<MonthlySalesReport/>} item = "Sales Report"/>}
        {!show && <h2>No access</h2>}
       
        </div>
     );
}
 
export default ViewRequests;