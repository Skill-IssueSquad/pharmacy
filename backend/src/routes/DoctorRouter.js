const router = require("express").Router();

const {
  submitPrescriptionToPharmacy,
  getPatients,
  getPharmacist
} = require("../controllers/DoctorController");

router.post("/createPatient", submitPrescriptionToPharmacy);
router.get("/chat/getPatients/", getPatients);
router.get("/chat/getPharmacist/", getPharmacist);
//router.get("/chat/getPharmacist/", getPharmacist);

module.exports = router;
