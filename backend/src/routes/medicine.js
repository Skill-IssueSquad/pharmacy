const express = require('express');
const Medicine = require('../models/Medicines');

const { default: mongoose } = require('mongoose');

const router = express.Router();

//get all medicine
router.get('/' , async (req,res)=>{
    try{
        console.log("ana hena");
        const medicine = await Medicine.find()
        console.log("ana hena");
        console.log(medicine);
        res.status(200).json(medicine)

    }catch (error){
        res.status(400).json({error : error.message})

    }
    //res.json({mssg : 'get all medicine'})
})
//get a specific medicine by name
router.get('/:name' , (req,res)=>{
    res.json({mssg : 'get a specific medicine by name'})
})
//get a specific medicine by use
router.get('/:medical_use' , (req,res)=>{
    res.json({mssg : 'get a specific medicine by use '})
})

module.exports = router;