const router = require("express").Router();

const {
  submitPrescriptionToPharmacy,
  getPatients
} = require("../controllers/DoctorController");

router.post("/createPatient", submitPrescriptionToPharmacy);
router.get("/chat/getPatients/", getPatients);

module.exports = router;
