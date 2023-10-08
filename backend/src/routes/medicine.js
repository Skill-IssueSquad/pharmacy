const express = require('express');
const Medicine = require('../models/Medicines');

const { default: mongoose } = require('mongoose');

const router = express.Router();
const medicineController = require("../controllers/medicineController")


//get all medicine
router.get('/' , medicineController.getAllMedicine)


//get a specific medicine by name
router.get('/searchByName/:name?' , medicineController.getMedicineByName)

// router.get('/searchByName/:name' , (req,res)=>{

//     const medicineName = req.params.name;
//     if (medicineName === '') {
//       console.log("TRUE")
//       console.log("IIII"+medicineName)
//     }

//     Medicine.find({ medicineName: medicineName })
//     .then(medicine => {
//       if (medicine) {
//         res.status(200).json(medicine);
//       } else {
//        // res.status(404).json({ error: 'Medicine not found' });
//        res.status(201).json([]);

//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'Internal server error' });
//     });

//     //res.json({mssg : 'get a specific medicine by name'})
// })



//get a specific medicine by use
router.get('/searchByMedial_use/:medical_use?' , medicineController.getMedicineByMedicalUse)


module.exports = router;