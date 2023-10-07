const Medicine = require('../models/Medicines');

const mongoose = require('mongoose');

const AddMedicine = async (req,res)=>{

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
const updateMedicine = async (req, res) => {
  const { medicineName } = req.params; // Get the medicine name from URL params
  const { newDescription, newPrice } = req.body;

  try {
    const updatedMedicine = await Medicine.findOneAndUpdate(
      { medicineName: medicineName }, // Find by medicine name
      {
        $set: {
          description: newDescription,
          price: newPrice,
        },
      },
      { new: true }
    );

    if (!updatedMedicine) {
      return res
        .status(404)
        .json({ success: false, message: 'Medicine not found', data: null });
    }

    res.status(200).json({
      success: true,
      message: 'Medicine updated successfully',
      data: updatedMedicine,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message, data: null });
  }
};

  


module.exports ={AddMedicine,getMedicines,searchMedicine,updateMedicine}