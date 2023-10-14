import React, { useEffect, useState } from "react";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <button>
          <a href="/patientRegisteration"> Patient Registeration </a>
        </button>

        <button>
          <a href="/pharmacistRegisteration"> Pharmacist Registeration </a>
        </button>
      </div>
    </div>
  );
};

export default Home;
