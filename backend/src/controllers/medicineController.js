const express = require("express");
const Medicine = require("../models/Medicines");
const mongoose = require("mongoose");



const AddMedicine = async (req, res) => {
  const {
    medicineName,
    description,
    medicinalUsage,
   // activeIngredients,
    quantity,
    price,
    sales,
    isArchived,
    requiresPrescription,
  } = req.body;
  const activeIngredients = JSON.parse(req.body.activeIngredients);

  let picture = "http://localhost:8000/images/"+req.nameFile;
 /* console.log("HERE5"+req.body.medicineName)
  console.log("HERE5"+req.body.description)
  console.log("HERE5"+req.body.medicinalUsage)
  console.log("HERE5"+req.body.activeIngredients)
  console.log("HERE5"+req.body.quantity)
  console.log("HERE5"+req.body.price)
  console.log("HERE5"+req.body.sales)
  console.log("HERE5"+req.body.isArchived)
  console.log("HERE5"+req.body.requiresPrescription)
  console.log("HERE5"+picture)*/



  //if (req.file != undefined)
    //picture = `http://localhost:8000/images/${req.file.filename}`;
  try {
    //console.log("HERE4")
    const newMedicine = await Medicine.create({
      medicineName,
      description,
      medicinalUsage,
      activeIngredients,
      quantity,
      price,
      picture,
      sales,
      isArchived,
      requiresPrescription,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Medicine created successfully",
        data: newMedicine,
      });
      //console.log("HERE6"+newMedicine)

  } catch (error) {

    res.status(400).json({ success: false, error: error.message, data: null });
  }
};


const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res
      .status(201)
      .json({ success: true, message: "All Medicines", data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, data: null });
  }
};

const searchMedicine = async (req, res) => {
  //search by name
  try {
    const medicine = await Medicine.findById(req.params.medicine);

    if (medicine == null) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found", data: null });
    }

    res
      .status(201)
      .json({ success: true, message: "Medicine found", data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, data: null });
  }
};

const medicinedetailsbyid = async (req, res) => {
  const { id } = req.params; // Get the medicine ID from the request parameters

  try {
    const medicine = await Medicine.findById({ _id: id });

    if (!medicine) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found", data: null });
    }

    res
      .status(200)
      .json({ success: true, message: "Medicine found", data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, data: null });
  }
};

const updateMedicine = async (req, res) => {
  const { id } = req.params; // Get the medicine name from URL params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such medicine" });
  }
  const medicine = await Medicine.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!medicine) {
    return res.status(404).json({ error: "no such medicine" });
  }
  res.status(200).json(medicine);
};

const getAllMedicine = async (req, res) => {
  try {
    //console.log("ana hena");
    const medicine = await Medicine.find({ isArchived: false });
    //console.log("ana hena");
    //        console.log(medicine);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //res.json({mssg : 'get all medicine'})
};

const getMedicineByName = (req, res) => {
  const medicineName = req.params.name;
  if (!medicineName || medicineName === "") {
    console.log("EMPTY SEARCH");
    res.status(200).json([]);
  } else {
    Medicine.find({ medicineName: medicineName, isArchived: false })
      .then((medicine) => {
        if (medicine) {
          res.status(200).json(medicine);
        } else {
          res.status(404).json({ error: "Medicine not found" });
          //res.status(201).json([]);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });

    //res.json({mssg : 'get a specific medicine by name'})
  }
};

const getMedicineByMedicalUse = (req, res) => {
  const medicinalUsage = req.params.medical_use;

  if (!medicinalUsage || medicinalUsage === "") {
    console.log("EMPTY SEARCH");
    res.status(200).json([]);
  } else {
    Medicine.find({ medicinalUsage: medicinalUsage, isArchived: false })
      .then((medicine) => {
        if (medicine) {
          res.status(200).json(medicine);
        } else {
          res.status(404).json({ error: "Medicine not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  }
};

module.exports = {
  AddMedicine,
  getMedicines,
  searchMedicine,
  updateMedicine,
  medicinedetailsbyid,
  getAllMedicine,
  getMedicineByName,
  getMedicineByMedicalUse,
};
