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
        res.status(201).json({success:true,message:"Medicine created successfully", data: newMedicine});
    }
    catch(error){

        res.status(400).json({success:false,error:error.message,data:null})

    }
}


const getMedicines = async (req,res)=>{

    try{
        const medicines = await Medicine.find({});
        res.status(201).json({success:true,message:"All Medicines",data:medicines});
    }
    catch(error){
        res.status(500).json({success:false,error:error.message,data:null});
    }
}



const searchMedicine = async (req,res)=>{

  
    //search by name
    try{
        
        const medicine = await Medicine.find({medicineName:req.params.medicine});
       
       
        if(medicine.length == 0)
        {
            return res.status(404).json({success:false,message:"Medicine not found",data:null});
        }

        res.status(201).json({success:true,message:"Medicine found",data:medicine});
    }
    catch(error){
        res.status(500).json({success:false,error:error.message,data:null});
    }

}



module.exports ={createMedicine,getMedicines,searchMedicine}