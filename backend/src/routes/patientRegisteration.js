const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

//reply to get requests with hello
router.get("/", (req, res) => {
  //fetch all patinets from DB
  Patient.find()
    .then((patients) => {
      res.status(200).json({
        messgage: " fetched patients successfully",
        status: true,
        data: patients,
      });
    })
    .catch((err) => {
      res.status(400).json({
        messgage: " Failed to fetch patients.",
        status: false,
        data: null,
      });
    });
});

//create one Patient
router.post("/", async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContact,
  } = req.body;

  try {
    const patient = await Patient.create({
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact,
    });
    res.status(200).json({
      messgage: " created patient successfully",
      status: true,
      data: patient,
    });
  } catch (err) {
    res.status(400).json({
      messgage: " Failed to create patient.",
      status: false,
      data: null,
    });
  }
});

module.exports = router;
