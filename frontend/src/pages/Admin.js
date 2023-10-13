import React, { useState } from "react";
import axios from "axios";
import CreateAdminForm from "../components/createAdminForm";

const Admin = () => {
  const submitAdmin = async (formData) => {
    //console.log(formData);
    await axios
      .post("http://localhost:8000/admin/createAdmin", formData)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          return { message: res.data.message };
        } else {
          return { message: res.data.message };
        }
      })
      .catch((err) => {
        console.log(err);
        return { message: "Something went wrong" };
      });
  };
  return (
    <div className="admin">
      <h2>Admin</h2>
      <CreateAdminForm onSubmit={submitAdmin} />
    </div>
  );
};

export default Admin;
