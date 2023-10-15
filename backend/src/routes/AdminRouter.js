const router = require("express").Router();
const {
  viewAdmins,
  createAdmin,
  removeAdmin,
  removePharmacist,
  removePatient,
  viewPharmacistInfo,
  viewPatientInfo,
  getMedicines,
  findMedicine,
  viewPharmacistRequests,
} = require("../controllers/AdminController");

//view and create admin
router.get("/viewAdmins", viewAdmins);
router.post("/createAdmin", createAdmin);

//remove
router.delete("/removeAdmin/:username", removeAdmin);
router.delete("/removePharmacist/:username", removePharmacist);
router.delete("/removePatient/:username", removePatient);

//view info
router.get("/viewPharmacistInfo/", viewPharmacistInfo);
router.get("/viewPatientInfo/", viewPatientInfo);
router.get("/viewPharmacistRequests", viewPharmacistRequests);

//medicine stuff
router.get("/medicines", getMedicines);
router.get("/findMedicine", findMedicine);

module.exports = router;
