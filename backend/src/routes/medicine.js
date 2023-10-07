const express = require('express');
const Medicine = require('../models/Medicines');

const { default: mongoose } = require('mongoose');

const router = express.Router();

//get all medicine
router.get('/' , async (req,res)=>{
    try{
        //console.log("ana hena");
        const medicine = await Medicine.find()
        //console.log("ana hena");
        console.log(medicine);
        res.status(200).json(medicine)

    }catch (error){
        res.status(400).json({error : error.message})

    }
    //res.json({mssg : 'get all medicine'})
})
//get a specific medicine by name
router.get('/searchByName/:name' , (req,res)=>{
    const medicineName = req.params.name;

    Medicine.find({ medicineName: medicineName })
    .then(medicine => {
      if (medicine) {
        res.status(200).json(medicine);
      } else {
        res.status(404).json({ error: 'Medicine not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });

    //res.json({mssg : 'get a specific medicine by name'})
})
//get a specific medicine by use
router.get('/searchByMedial_use/:medical_use' , (req,res)=>{
    const medicinalUsage = req.params.medical_use;
    

    // const medicines = Medicine.filter(item => item.medicinalUsage === medicinalUsage);

    // if (medicines.length > 0) {
    //   res.status(200).json(medicines);
    // } else {
    //   res.status(404).json({ error: 'Medicine not found for the given usage' });
    // }
    //res.json({mssg : 'get a specific medicine by use '})
    
    
    Medicine.find({ medicinalUsage: medicinalUsage })
    .then(medicine => {
      if (medicine) {
        res.status(200).json(medicine);
      } else {
        res.status(404).json({ error: 'Medicine not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });

    // const medicinalUsage = req.params.medical_use;

    // if (Medicine.medicinalUsage === medicinalUsage) {
    //   res.status(200).json(medicineData);
    // } else {
    //   res.status(404).json({ error: 'Medicine not found for the given usage' });
    // }
})

module.exports = router;