const router = require("express").Router();
const {
  viewAdmins,
  createAdmin,
  removeAdmin,
  removePharmacist,
  removePatient,
  viewPharmacistInfo,
  viewPatientInfo,
} = require("../controllers/AdminController");

router.get("/viewAdmins", viewAdmins);
router.post("/createAdmin", createAdmin);
router.delete("/removeAdmin/:username", removeAdmin);
router.delete("/removePharmacist/:username", removePharmacist);
router.delete("/removePatient/:username", removePatient);
router.get("/viewPharmacistInfo/:username", viewPharmacistInfo);
router.get("/viewPatientInfo/:username", viewPatientInfo);

module.exports = router;
