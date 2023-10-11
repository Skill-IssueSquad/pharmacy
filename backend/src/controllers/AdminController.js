const Admin = require("../models/Admin");
const Pharmacist = require("../models/Pharmacist");
const Patient = require("../models/Patient");

//Add Admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAdmin = await Admin.create({
      username: username,
      password: password,
    });
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
    return res.status(500).json(reply);
  }
};

const viewAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      const reply = {
        success: false,
        data: null,
        message: "No admins found",
      };
      return res.status(404).json(reply);
    }
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
    return res.status(500).json(reply);
  }
};

const removeAdmin = async (req, res) => {
  const { username } = req.params;
  const removedAdmin = await Admin.deleteOne({ username: username })
    .then(() => {
      const reply = {
        success: true,
        data: removedAdmin,
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
      return res.status(500).json(reply);
    });
};

const removePharmacist = async (req, res) => {
  const { username } = req.params;

  const removedPharm = await Pharmacist.deleteOne({
    username: username,
  })
    .then(() => {
      const reply = {
        success: true,
        data: removedPharm,
        message: "Pharmacist removed successfully",
      };
      return res.status(200).json(reply);
    })
    .catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });
};

const removePatient = async (req, res) => {
  const { username } = req.params;

  const removedPatient = await Patient.deleteOne({
    username: username,
  })
    .then(() => {
      const reply = {
        success: true,
        data: removedPatient,
        message: "Patient removed successfully",
      };
      return res.status(200).json(reply);
    })
    .catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });
};

const viewPharmacistInfo = async (req, res) => {
  const { username } = req.params;

  const pharmacist = await Pharmacist.findOne({
    username: username,
  })
    .then(() => {
      if (!pharmacist) {
        const reply = {
          success: false,
          data: null,
          message: "No pharmacist found",
        };
        return res.status(404).json(reply);
      }
      const reply = {
        success: true,
        data: pharmacist,
        message: "Pharmacist retrieved successfully",
      };
      return res.status(200).json(reply);
    })
    .catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });
};

const viewPatientInfo = async (req, res) => {
  const { username } = req.params;

  const patient = await Patient.findOne({
    username: username,
  })
    .then(() => {
      if (!patient) {
        const reply = {
          success: false,
          data: null,
          message: "No patient found",
        };
        return res.status(404).json(reply);
      }
      const reply = {
        success: true,
        data: patient,
        message: "Patient retrieved successfully",
      };
      return res.status(200).json(reply);
    })
    .catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });
};

module.exports = {
  viewAdmins,
  createAdmin,
  removeAdmin,
  removePharmacist,
  removePatient,
  viewPharmacistInfo,
  viewPatientInfo,
};
