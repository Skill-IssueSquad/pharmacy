import React, { useState, useEffect } from "react";
import PharmacistRegistrationForm from "../../components/Home/PharmacistRegisterationForm";
import AppBar from '../../components/appBar';

const PharmacistRegisteration = () => {
    return(
        <div>
            <AppBar/>
            <PharmacistRegistrationForm flag = {true}/>
        </div>
    );
};

export default PharmacistRegisteration;