const PharmacistRequest = require("../models/PharmacistRequest");

//View pharmacist request info 
const viewInfo = async (req,res) => {
    try{
        const username = req.body.username;
        const pharmacistRequest = await PharmacistRequest.find({username});
        const reply = {
            success: true,
            data: pharmacistRequest,
            message: "Pharmacist request retrieved successfully",
        }
        res.status(200).json(reply);
    }catch(error){
        const reply = {
            success: false,
            data: null,
            message: error.message,
        };
        res.status(400).json(reply);
    }
};




module.exports = {
    viewInfo,
};