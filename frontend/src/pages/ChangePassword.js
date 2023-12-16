import React, { useState, useEffect } from "react";
import ChangeForm from "../components/ChangePasswordForm";
import { auth } from "./Protected/AuthProvider";
import ResponsiveAppBar from "../components/navBarC";
import Navbar from "../components/navBarPharmacist";

const ChangePassword = () => {
    let show = false;
    let role="";

    if(auth()){
      show = true;
        role = localStorage.getItem('role');
    }

    return(
        <div>
            {show? (
            <div>
                {role==="Patient"? <ResponsiveAppBar button={"Change Password"}/> : <Navbar button={"Change Password"}/>}
            <ChangeForm flag = {true}/>
            </div>):
            (<h2>No access</h2>)
            }
        </div>
    );
};

export default ChangePassword;