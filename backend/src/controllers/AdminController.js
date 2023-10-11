const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const DoctorRequest = require("../models/DoctorRequest");
const Patient = require("../models/Patient");
const HealthPackage = require("../models/Packages");

//Add Admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAdmin = await Admin.create(username, password);
    const reply = {
      success: true,
      data: newAdmin,
      message: "Admin added successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(400).json(reply);
  }
};

const viewAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    const reply = {
      success: true,
      data: admins,
      message: "Admins retrieved successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(400).json(reply);
  }
};

const removeAdmin = async (req, res) => {
  const { username } = req.params;
  Admin.deleteOne({ username: username })
    .then(() => {
      const reply = {
        success: true,
        data: req.params.username,
        message: "Admin removed successfully",
      };
      return res.status(200).json(reply);
    })
    .catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(400).json(reply);
    });
};

const removePharmacist = async (req, res) => {};

const removePatient = async (req, res) => {};

const viewPharmacistInfo = async (req, res) => {};

const viewPatientInfo = async (req, res) => {};

module.exports = {
  viewAdmins,
  createAdmin,
  removeAdmin,
  removePharmacist,
  removePatient,
  viewPharmacistInfo,
  viewPatientInfo,
};
