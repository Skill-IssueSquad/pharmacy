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
  /*const orders = patient.orders;

        */
       
        const orders = patient.orders;
        const index = orders.findIndex((order) => order._id == orderID);
        const cart = orders[index].cart;
        const medicines = cart.medicines;

        for(let i = 0;i<medicines.length;i++){
          const medicine = await Medicine.findOne({_id:medicines[i].medicine_id});
          medicine.quantity = medicine.quantity + medicines[i].quantity;
          await medicine.save();
        }
        
       if(patient.walletBalance == undefined)
       patient.walletBalance =  orders[index].netPrice ;
      else 
      patient.walletBalance =   patient.walletBalance + orders[index].netPrice;
     
     

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
    console.log("I am here");
    const{username,cart,data} = req.body;
    try{
      const patient = await Patient.findOne({username:username});
    
      if(patient == null){
        
          return res.status(404).json({success: false , message: "Patient not found" , data: null})
      }
      else{
       
        const newMedicines = cart.medicines;
        let newTotalPrice = 0;
        let newNetPrice = 0;
        
        for(let i = 0;i<newMedicines.length;i++){
          if(newMedicines[i].quantity == 0){
            continue;
          }
          
          const indexInMedicine = data.findIndex((medicine) => medicine._id == newMedicines[i].medicine_id);
       
          const  index = patient.cart.medicines.findIndex((medicine) => medicine.medicine_id == newMedicines[i].medicine_id);
          
        if(index != -1){
          const oldQuantity = patient.cart.medicines[index].quantity;

          const newQuantity =patient.cart.medicines[index].quantity + newMedicines[i].quantity;
          if(newQuantity <= data[indexInMedicine].quantity){
            patient.cart.medicines[index].quantity = newQuantity;
          }
          else{
            patient.cart.medicines[index].quantity = data[indexInMedicine].quantity;
          }
          newTotalPrice = patient.cart.totalPrice+(patient.cart.medicines[index].quantity * data[indexInMedicine].price)- (oldQuantity * data[indexInMedicine].price);
          newNetPrice = newTotalPrice - newTotalPrice * (patient.cart.discount ? patient.cart.discount : 0);

        }
        else{
          
          const medicine = {
            medicine_id: newMedicines[i].medicine_id,
            quantity: newMedicines[i].quantity,
          }
          patient.cart.medicines.push(medicine);
          console.log(patient.cart.medicines);
         
          if (!patient.cart.totalPrice) {
            patient.cart.totalPrice = 0;
          }
          
          newTotalPrice = patient.cart.totalPrice+medicine.quantity * data[indexInMedicine].price;
         
         
          newNetPrice = newTotalPrice - newTotalPrice * (patient.cart.discount ? patient.cart.discount : 0);
        }
        patient.cart.totalPrice = newTotalPrice;
        console.log(newTotalPrice);
        console.log(newNetPrice);
        patient.cart.netPrice = newNetPrice;
        
      }
      console.log("Hi");
      try{
        await patient.save();

      }catch(error){
        console.log(error.message);
      }
      
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
  