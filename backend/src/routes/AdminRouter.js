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
  viewallordersandcreatesalesreport,
  viewFilteredOrders,
  viewRecentOrders,

 
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

//salesreport
router.get('/orders' ,viewallordersandcreatesalesreport)
router.get('/rescentorders' ,viewRecentOrders)

router.get('/filteredOrders', viewFilteredOrders); // Add the new route for filtered orders




//medicine stuff
router.get("/medicines", getMedicines);
router.get("/findMedicine", findMedicine);

module.exports = router;
