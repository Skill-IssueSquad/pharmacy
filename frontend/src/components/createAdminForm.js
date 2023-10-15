import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const CreateAdminForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null); // New state for response message

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Validate required fields
    const newErrors = {};
    for (const field in formData) {
      if (formData[field] === "") {
        newErrors[field] = "This field is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are errors
    }

    try {
      const response = await onSubmit(formData);
      if (response && response.message) {
        setResponseMessage(response.message);
      }
      // Clear the form on successful submission
      setFormData({
        username: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      // Handle any error that occurs during submission
    }
  };

  return (
    <Box maxWidth={400} mx="auto" p={2}>
      {responseMessage && <div>{responseMessage}</div>}
      <TextField
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        required
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Admin
      </Button>
    </Box>
  );
};

export default CreateAdminForm;
