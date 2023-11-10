const express = require("express");
const router = express.Router();
const Doctor = require("../models/PharmacistRequest");
const Pharmacist = require("../models/PharmacistRequest");

const path = require("path")
const multer = require("multer")


//get all doctor requests
router.get("/", async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find();
    res.status(200).json({
      messgage: " got all pharmacist requests successfully",
      status: true,
      data: pharmacists,
    });
  } catch (err) {
    res.status(400).json({
      messgage: " Failed to get all pharmacist requests.",
      status: false,
      data: null,
    });
  }
});




let nameFile;
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'images')
  },
  filename : (req,file,cb)=> {
   nameFile= Date.now() + "--" + file.originalname
   req.nameFile=nameFile
    cb(null,nameFile)
  }
})
const upload=multer({storage:storage})

//Request registeration as doctor
router.post("/", async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    hourlyRate,
    affiliatedHospital,
    educationalBackground,
  } = req.body;

  let id = "http://localhost:8000/images/"+req.nameFile;

  try {
    const pharmacist = await Pharmacist.create({
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliatedHospital,
      educationalBackground,
      id
    });
    res.status(200).json({
      messgage: "Submitted Application successfully",
      status: true,
      data: pharmacist,
    });
  } catch (err) {
    res.status(400).json({
      messgage: " Failed to submit request.",
      status: false,
      data: null,
    });
  }
});

module.exports = router;
