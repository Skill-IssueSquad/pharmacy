const router = require("express").Router();

const {
    viewInfo,
    updateInfo,
} = require("../controllers/PharmacistRequestController");

router.get("/viewInfo",  viewInfo);
router.patch("/updateInfo/:username",  updateInfo);


module.exports = router;