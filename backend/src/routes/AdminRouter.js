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

module.exports = router;
