import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import PharmacistInfo from "../../components/PharmacistRequest/Profile";
import { auth } from "../Protected/AuthProvider";
import Navbar from "../../components/navBarPharmacistRequest";

const PharmacistRequest = () => {
    let show = false;

    if(auth() && localStorage.getItem('role')==="PharmacistRequest"){
      show = true;
    }
    return(
        <div>
        {show? (
            <div>
                <Navbar button={"Profile"}/>
            <PharmacistInfo flag = {true}/>
            </div>):
        (<h2>No access</h2>)
        }
        </div>
    );
};

export default PharmacistRequest;