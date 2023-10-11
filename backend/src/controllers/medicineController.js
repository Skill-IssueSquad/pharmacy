const Medicine = require('../models/Medicines');

const mongoose = require('mongoose');

const AddMedicine = async (req,res)=>{

    const{medicineName,description,medicinalUsage,activeIngredients,quantity,price,sales,isArchived,requiresPrescription} = req.body;
    if(req.file != undefined)
    picture =`http://localhost:8000/images/${req.file.filename}`;
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
        
        const medicine = await Medicine.findById(req.params.medicine);
       
       
        if(medicine== null)
        {
            return res.status(404).json({success:false,message:"Medicine not found",data:null});
        }

        res.status(201).json({success:true,message:"Medicine found",data:medicine});
    }
    catch(error){
        res.status(500).json({success:false,error:error.message,data:null});
    }

}

const medicinedetailsbyid = async (req, res) => {
     const {id} = req.params; // Get the medicine ID from the request parameters
   
     try {
       const medicine = await Medicine.findById({_id:id});
   
       if (!medicine) {
         return res.status(404).json({ success: false, message: "Medicine not found", data: null });
       }
   
       res.status(200).json({ success: true, message: "Medicine found", data: medicine });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message, data: null });
     }
   }
   
 const updateMedicine = async (req, res) => {
   const { id } = req.params; // Get the medicine name from URL params
   
   if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({error: "no such medicine"})
   }
   const medicine = await Medicine.findOneAndUpdate({_id: id}, { 
     ...req.body
    })
 
 
 if(!medicine){
   return res.status(404).json({error: "no such medicine"})
 }
 res.status(200).json(medicine)
 
 }

module.exports ={AddMedicine,getMedicines,searchMedicine,updateMedicine,medicinedetailsbyid}