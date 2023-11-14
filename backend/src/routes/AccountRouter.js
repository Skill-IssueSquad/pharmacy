const router = require("express").Router();

const {
    registerPharmacist,
    registerPatient,
    login,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword
} = require("../controllers/AccountController");

router.post("/registerPatient", registerPatient);
router.post("/registerPharmacist", registerPharmacist);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOTP", verifyOTP);
router.post("/resetPassword", resetPassword);

module.exports = router;