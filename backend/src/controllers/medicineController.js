const Medicine = require('../models/Medicines');

const mongoose = require('mongoose');

const createMedicine = async (req,res)=>{

    const{medicineName,description,medicinalUsage,activeIngredients,quantity,price,picture,sales,isArchived,requiresPrescription} = req.body;

    try{
        const newMedicine = await Medicine.create({
            medicineName,
            description,
            medicinalUsage,
            activeIngredients,
            quantity,
            price,
            picture,
            sales,
            isArchived,
            requiresPrescription
        });
        res.json({message: "Medicine created successfully", newMedicine});
    }
    catch(error){

        res.status(400).json({error:error.message})

    }
}


const getMedicines = async (req,res)=>{

    try{
        const medicines = await Medicine.find({});
        res.json({medicines});
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports ={createMedicine,getMedicines}