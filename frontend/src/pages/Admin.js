import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateAdminForm from "../components/createAdminForm";
import ViewAdmins from "../components/viewAdmins";

const Admin = () => {
  const [temp, setTemp] = useState(0); // to force rerender
  const submitAdmin = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/admin/createAdmin",
        formData
      );
      console.log(res.data);
      return { message: res.data.message };
      setTemp(temp + 1);
    } catch (error) {
      console.log(error);
      return { message: "Something went wrong" };
    }
  };

  useEffect(() => {}, [submitAdmin]);

  return (
    <div className="admin">
      <h2>Admin</h2>
      <p></p>
      <CreateAdminForm onSubmit={submitAdmin} />
      <p></p>
      <ViewAdmins
        columns={["username"]}
        API_GET_URL={"http://localhost:8000/admin/viewAdmins"}
      />
    </div>
  );
};

export default Admin;
