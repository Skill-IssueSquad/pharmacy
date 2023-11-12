const express = require("express");
const Medicine = require("../models/Medicines");
const Patient = require("../models/Patient");

const mongoose = require("mongoose");

const getCart = async (req,res) =>{
    const { username } = req.body;
    try{
        const patient = await Patient.findOne({username:username})
        if(patient != null){
            return res.status(200).json({success: true , message: "Cart returened" , data: patient.cart})
        }
        else{
            return res.status(404).json({success: false , message: "Patient not found" , data: null})

        }
    }
    catch (error) {
        const reply = {
          success: false,
          data: null,
          message: error.message,
        };
        return res.status(500).json(reply);
      }

}


const removeMedicine = async(req,res) =>{
    const{userName,medicineId} = req.body;
    console.log(userName, medicineId);
  
    try{
        

        const patient = await Patient.findOne({username:userName});
        if(patient != null){
            

            const cart = patient.cart.medicines;
            const newCart = cart.filter((medicine) => medicine.medicine_id != medicineId);
            patient.cart.medicines = newCart;
            await patient.save();

            return res.status(200).json({success: true , message: "Medicine removed" , data: patient.cart})



        }
        else{
            return res.status(404).json({success: false , message: "Patient not found" , data: null})

        }
    }
    catch(error){
        return res.status(500).json({success: false , message: error.message , data: null});
    }
}

const getPatient = async (req,res) =>{
    const { username } = req.body;
    try{
        const patient = await Patient.findOne({username:username})
        if(patient != null){
            return res.status(200).json({success: true , message: "Patient returened" , data: patient})
        }
        else{
            return res.status(404).json({success: false , message: "Patient not found" , data: null})

        }
    }
    catch (error) {
        const reply = {
          success: false,
          data: null,
          message: error.message,
        };
        return res.status(500).json(reply);
      }

}

//add address to patient
const addAddressToPatient = async (req,res) =>{
    console.log("ana in");
    const { username,streetName,propertyNumber,FloorNumber,ApartmentNumber,ExtraLandmarks } = req.body;
    try{
        
        const patient = await Patient.findOne({username:username})
        if(patient == null){
            return res.status(404).json({success: false , message: "Patient not found" , data: null})
        }
        else{
            console.log("ana in address");




              const address = {
                streetName: streetName,
                propertyNum: propertyNumber,
                floorNum: FloorNumber,
                apartNum: ApartmentNumber,
                extraLandMarks: ExtraLandmarks
              };

           patient.deliveryAddresses.push(address);
           await patient.save();

           return res.status(200).json({success: true , message: "Patient  found" , data: patient})

           
           
        }
    }
    catch (error) {
        const reply = {
          success: false,
          data: null,
          message: error.message,
        };
        return res.status(500).json(reply);
      }


}


const addOrderToPatient = async (req,res) =>{
    //console.log("ana in");
    const { username,status,date,cart,discount,netPrice,deliveryAddress } = req.body;
    try{
        
        const patient = await Patient.findOne({username:username})
        if(patient == null){
            return res.status(404).json({success: false , message: "Patient not found" , data: null})
        }
        else{
            //console.log("ana in address");

              const newAddress= {
                streetName: deliveryAddress.streetName,
                propertyNum: deliveryAddress.propertyNumber,
                floorNum: deliveryAddress.floorNumber,
                apartNum: deliveryAddress.apartmentNumber,
                extraLandMarks: deliveryAddress.extraLandmarks,
              }

              const cart1= {
                medicines : cart
              }
             


              const order = {
                status: status,
                date: date,
                cart : cart1,
                discount: discount,
                netPrice: netPrice,
                deliveryAddress : newAddress

              };

           patient.orders.push(order);
           await patient.save();


           for(let i = 0;i<cart.length;i++){
            const medicine = await Medicine.findOne({_id:cart[i].medicine_id});
            medicine.quantity = medicine.quantity - cart[i].quantity < 0 ? 0 : medicine.quantity - cart[i].quantity;
            await medicine.save();
           }

           return res.status(200).json({success: true , message: "Patient  found" , data: patient})

           
           
        }
    }
    catch (error) {
        const reply = {
          success: false,
          data: null,
          message: error.message,
        };
        return res.status(500).json(reply);
      }

}



const deleteOrder = async (req,res)=>{


    const{username,orderID} = req.body;

  try{
    const patient = await Patient.findOne({username:username});
  
    if(patient == null){
        return res.status(404).json({success: false , message: "Patient not found" , data: null})
    }
    else{
  
        const orders = patient.orders;
        const newOrders = orders.filter((order) => order._id != orderID);
        patient.orders = newOrders;
        await patient.save();
  
        console.log(patient);
        return res.status(200).json({success: true , message: "Order removed" , data: patient.orders})
    }
  }
  catch(error){
    return res.status(500).json({success: false , message: error.message , data: null});
  }
  }


  const clearCart = async (req,res)=>{
  const{username} = req.body;

 try{
    const patient = await Patient.findOne({username:username});
  
    if(patient == null){
        return res.status(404).json({success: false , message: "Patient not found" , data: null})
    }
    else{

        patient.cart ={};
        await patient.save();

  
      
        return res.status(200).json({success: true , message: "Cart Cleared" , data: patient.cart})
    }
  }
  catch(error){
    return res.status(500).json({success: false , message: error.message , data: null});
  }

  }

  const saveCart = async (req,res)=>{
    const{username,cart} = req.body;
    try{
      const patient = await Patient.findOne({username:username});
    
      if(patient == null){
          return res.status(404).json({success: false , message: "Patient not found" , data: null})
      }
      else{
  
        // const newMedicines = cart.medicines;
        // for(let i = 0;i<newMedicines.length;i++){
        //   patient.cart.medicines.find((medicine) => medicine.medicine_id == newMedicines[i].medicine_id).quantity += newMedicines[i].quantity;

        patient.cart = cart;
        await patient.save();

  
      
        return res.status(200).json({success: true , message: "Cart Saved" , data: patient.cart})
        }
         
      }
    
    catch(error){
      return res.status(500).json({success: false , message: error.message , data: null});
    }

  }



module.exports = {
    getCart,removeMedicine,getPatient,addAddressToPatient,addOrderToPatient,deleteOrder,clearCart,saveCart
  };
  