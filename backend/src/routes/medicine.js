const express = require('express');
const Medicine = require('../models/Medicines');

const { default: mongoose } = require('mongoose');

const router = express.Router();
const medicineController = require("../controllers/medicineController")


//get all medicine
router.get('/' , medicineController.getAllMedicine)


//get a specific medicine by name
router.get('/searchByName/:name?' , medicineController.getMedicineByName)



//get a specific medicine by use
router.get('/searchByMedial_use/:medical_use?' , medicineController.getMedicineByMedicalUse)

router.post('/addToCart/:userName/:medicineId/:quantity' , medicineController.AddToCart);

router.post('/getArrayMedicinesByID',medicineController.getArrayOfMedicine);

module.exports = router;