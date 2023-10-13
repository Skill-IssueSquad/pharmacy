import React, { useState } from "react";
import axios from "axios";
import CreateAdminForm from "../components/createAdminForm";

const Admin = () => {
  const submitAdmin = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/admin/createAdmin",
        formData
      );
      console.log(res.data);
      return { message: res.data.message };
    } catch (error) {
      console.log(error);
      return { message: "Something went wrong" };
    }
  };

  return (
    <div className="admin">
      <h2>Admin</h2>
      <p></p>
      <CreateAdminForm onSubmit={submitAdmin} />
    </div>
  );
};

export default Admin;
