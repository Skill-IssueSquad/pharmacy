const router = require("express").Router();

const {
  submitPrescriptionToPharmacy,
} = require("../controllers/DoctorController");

router.post("/createPatient", submitPrescriptionToPharmacy);

module.exports = router;
