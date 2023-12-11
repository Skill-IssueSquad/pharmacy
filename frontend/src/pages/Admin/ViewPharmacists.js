import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import PharmacistTable from "../../components/Admin/PharmacistTable";
import { auth } from "../Protected/AuthProvider";

const ViewPharmacists = () => {
    let show = false;

    if(auth() && localStorage.getItem('role')==="Admin"){
        show = true;
    }

    return ( 
        <div>
        {show && <AdminSideBar flag = {false} ViewComponent={<PharmacistTable />}/>}
        {!show && <h2>No access</h2>}
        
        </div>
     );
}
 
export default ViewPharmacists;