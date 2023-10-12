const express = require('express');
const Medicine = require('../models/Medicines');


const getAllMedicine= async (req,res)=>{
    try{
        //console.log("ana hena");
        const medicine = await Medicine.find({isArchived: false})
        //console.log("ana hena");
//        console.log(medicine);
        res.status(200).json(medicine)

    }catch (error){
        res.status(400).json({error : error.message})

    }
    //res.json({mssg : 'get all medicine'})
}


const getMedicineByName = (req,res)=>{

    const medicineName = req.params.name;
    if (!medicineName || medicineName === '') {
      console.log("EMPTY SEARCH")
      res.status(200).json([]);
    }
    else{
    Medicine.find({ medicineName: medicineName ,isArchived: false })
    .then(medicine => {
      if (medicine) {
        res.status(200).json(medicine);

      } else {
        res.status(404).json({ error: 'Medicine not found' });
       //res.status(201).json([]);

      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });

    //res.json({mssg : 'get a specific medicine by name'})
  }
}


const getMedicineByMedicalUse = (req,res)=>{
    const medicinalUsage = req.params.medical_use;
    

    if (!medicinalUsage || medicinalUsage === '') {
      console.log("EMPTY SEARCH")
      res.status(200).json([]);
    }
    else{
    Medicine.find({ medicinalUsage: medicinalUsage , isArchived: false })
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
  }
 
}


module.exports= {getAllMedicine,getMedicineByName, getMedicineByMedicalUse}