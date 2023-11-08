const express = require('express');
const Medicine = require('../models/Medicines');

const { default: mongoose } = require('mongoose');

const router = express.Router();
const patientController = require("../controllers/patientController")

router.post('/cart' , patientController.getCart)


module.exports = router;
