import React, { useState } from "react";
import axios from "axios";
import createAdminForm from "../components/createAdminForm";

const Admin = () => {
  const submitAdmin = async (formData) => {
    //console.log(formData);
    await axios
      .patch("", formData)
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
      <h2>This page will be to view admins and create new admins</h2>
      <createAdminForm onSubmit={submitAdmin} />
    </div>
  );
};

export default Admin;
