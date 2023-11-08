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

module.exports = {
    getCart
  };
  