const router = require("express").Router();
const {
  getAdmin,
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
  acceptPharmacist,
  rejectPharmacist
} = require("../controllers/AdminController");

//view and create admin
router.post("/getAdmin/:username", getAdmin);
router.get("/viewAdmins", viewAdmins);
router.post("/createAdmin", createAdmin);
router.delete("/removeAdmin/:username",  removeAdmin);

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

//accept/reject pharmacist
router.post("/acceptPharmacist", acceptPharmacist);
router.post("/rejectPharmacist", rejectPharmacist);

module.exports = router;
