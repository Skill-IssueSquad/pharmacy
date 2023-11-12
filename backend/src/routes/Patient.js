const express = require('express');
const Medicine = require('../models/Medicines');

const { default: mongoose } = require('mongoose');

const router = express.Router();
const patientController = require("../controllers/patientController")

router.post('/cart' , patientController.getCart)

router.post('/removeMedicineFromCart' , patientController.removeMedicine)
router.post('/getPatient' , patientController.getPatient);
router.post('/addAddress' , patientController.addAddressToPatient);
router.post('/addOrder' , patientController.addOrderToPatient);

router.post('/deleteOrder' , patientController.deleteOrder);

router.post('/clearCart',patientController.clearCart);
router.post('/saveCart',patientController.saveCart);

module.exports = router;
