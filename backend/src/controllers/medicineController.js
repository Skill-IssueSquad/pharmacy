const express = require("express");
const Medicine = require("../models/Medicines");
const Patient = require("../models/Patient");

const mongoose = require("mongoose");

const AddMedicine = async (req, res) => {
  const {
    medicineName,
    description,
    medicinalUsage,
    activeIngredients,
    quantity,
    price,
    sales,
    isArchived,
    requiresPrescription,
  } = req.body;
  let picture = "";
  if (req.file != undefined)
    picture = `http://localhost:8000/images/${req.file.filename}`;
  try {
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
      requiresPrescription,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Medicine created successfully",
        data: newMedicine,
      });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message, data: null });
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res
      .status(201)
      .json({ success: true, message: "All Medicines", data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, data: null });
  }
};

const searchMedicine = async (req, res) => {
  //search by name
  try {
    const medicine = await Medicine.findById(req.params.medicine);

    if (medicine == null) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found", data: null });
    }

    res
      .status(201)
      .json({ success: true, message: "Medicine found", data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, data: null });
  }
};

const medicinedetailsbyid = async (req, res) => {
  const { id } = req.params; // Get the medicine ID from the request parameters

  try {
    const medicine = await Medicine.findById({ _id: id });

    if (!medicine) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found", data: null });
    }

    res
      .status(200)
      .json({ success: true, message: "Medicine found", data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, data: null });
  }
};

const updateMedicine = async (req, res) => {
  const { id } = req.params; // Get the medicine name from URL params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such medicine" });
  }
  const medicine = await Medicine.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!medicine) {
    return res.status(404).json({ error: "no such medicine" });
  }
  res.status(200).json(medicine);
};

const getAllMedicine = async (req, res) => {
  try {
    //console.log("ana hena");
    const medicine = await Medicine.find({ isArchived: false });
    //console.log("ana hena");
    //        console.log(medicine);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //res.json({mssg : 'get all medicine'})
};

const getMedicineByName = (req, res) => {
  const medicineName = req.params.name;
  if (!medicineName || medicineName === "") {
    console.log("EMPTY SEARCH");
    res.status(200).json([]);
  } else {
    Medicine.find({ medicineName: medicineName, isArchived: false })
      .then((medicine) => {
        if (medicine) {
          res.status(200).json(medicine);
        } else {
          res.status(404).json({ error: "Medicine not found" });
          //res.status(201).json([]);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });

    //res.json({mssg : 'get a specific medicine by name'})
  }
};

const getMedicineByMedicalUse = (req, res) => {
  const medicinalUsage = req.params.medical_use;

  if (!medicinalUsage || medicinalUsage === "") {
    console.log("EMPTY SEARCH");
    res.status(200).json([]);
  } else {
    Medicine.find({ medicinalUsage: medicinalUsage, isArchived: false })
      .then((medicine) => {
        if (medicine) {
          res.status(200).json(medicine);
        } else {
          res.status(404).json({ error: "Medicine not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  }
};

// const AddToCart = async (req, res) => {

//   console.log("Masr hena");
//   const userName = req.params.userName;

//   const medicineId = req.params.medicineId;
//   const quantity = req.params.quantity;
//   console.log(userName);
//   console.log(medicineId);
//   console.log(quantity);
//   const medicine = await Medicine.findById({ _id: medicineId }).then((medicine) => {

//     if (medicine) {
//     //  res.status(200).json(medicine);
//     console.log('medicine found');
//     } else {
//      // res.status(404).json({ error: "Medicine not found" });
     
//     }
//   }).catch((error) => {
//    // res.status(500).json({ error: "Internal server error" });
//   });


//   const user = await Patient.findOneAndUpdate({ username: userName },{ $push: {'cart.medicines': { medicine_id: medicineId, quantity: quantity } } }).then((patient) => {
//     if (patient) {
//       res.status(200).json(patient);
//     } else {
//       res.status(404).json({ error: "Patient not found" });
     
//     }
//   }).catch((error) => {
//     res.status(500).json({ error: "Internal server error" });
//   });;
 
  
// };


const AddToCart = async (req, res) => {

  const userName = req.params.userName;
  const medicineId = req.params.medicineId;
  const quantity = req.params.quantity;

  console.log('userName:', userName);
  console.log('medicineId:', medicineId);
  console.log('quantity:', quantity);

  try {
  

    const medicine = await Medicine.findById({ _id: medicineId });


    if (!medicine) {
      console.log('Medicine not found');
      return res.status(404).json({ success:false,data:null,message:"Medicine not found"});
    }

    







    if(medicine.quantity == 0){
      return res.status(404).json({succes:false,data:null,message:"Medicine is out of stock"});
    }
    else{
    medicine.quantity = medicine.quantity - 1;
    medicine.sales = medicine.sales+1;
    await medicine.save();
    }

    const user = await Patient.findOneAndUpdate(
      { username: userName },
      { $push: { 'cart.medicines': { medicine_id: medicineId, quantity: quantity } } },
      //{ new: true }
    );








    const totalPrice = user.cart.totalPrice + medicine.price * quantity;
    

    console.log(totalPrice);
    const netPrice = totalPrice - (totalPrice * 0.05);
    

    const discount = totalPrice -netPrice;


    console.log(netPrice);
    console.log(discount);



    // const userTwo = await Patient.findOneAndUpdate(
    //   { username: userName },
    //   {$set: { 'cart.totalPrice': totalPrice } },
    //   {$set:{'cart.discount':discount}},
    //   {$set:{'cart.netPrice':netPrice}}


    // );
    user.cart.totalPrice = totalPrice;
    user.cart.netPrice = netPrice;
    user.cart.discount = discount;
    await user.save();

    
    if (user) {
      console.log('User cart updated:', user.cart);
      return res.status(200).json(user);
    } else {
      console.log('Patient not found');
      return res.status(404).json({ success:false,data:null,error: "Patient not found" });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success:false,data:null, error: "Internal server error" });
  }
};




module.exports = {
  AddMedicine,
  getMedicines,
  searchMedicine,
  updateMedicine,
  medicinedetailsbyid,
  getAllMedicine,
  getMedicineByName,
  getMedicineByMedicalUse,
  AddToCart
};
