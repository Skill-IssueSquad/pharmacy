const express = require("express");
const Medicine = require("../models/Medicines");
const Patient = require("../models/Patient");

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");



const AddMedicine = async (req, res) => {
  const {
    medicineName,
    description,
    medicinalUsage,
   // activeIngredients,
    quantity,
    price,
    sales,
    isArchived,
    requiresPrescription,
  } = req.body;
  const activeIngredients = JSON.parse(req.body.activeIngredients);

  let picture = "http://localhost:8000/images/"+req.nameFile;
 /* console.log("HERE5"+req.body.medicineName)
  console.log("HERE5"+req.body.description)
  console.log("HERE5"+req.body.medicinalUsage)
  console.log("HERE5"+req.body.activeIngredients)
  console.log("HERE5"+req.body.quantity)
  console.log("HERE5"+req.body.price)
  console.log("HERE5"+req.body.sales)
  console.log("HERE5"+req.body.isArchived)
  console.log("HERE5"+req.body.requiresPrescription)
  console.log("HERE5"+picture)*/



  //if (req.file != undefined)
    //picture = `http://localhost:8000/images/${req.file.filename}`;
  try {
    //console.log("HERE4")
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
      //console.log("HERE6"+newMedicine)

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
const getArrayOfMedicine = async (req, res) => {
  const getArrayOfMedicineIDS = req.body.cartItems;
//console.log("ArrayIds: "+getArrayOfMedicineIDS);
  if (!getArrayOfMedicineIDS || getArrayOfMedicineIDS.length === 0) {
    //console.log("EMPTY Cart");
    res.status(200).json([]);
    return;
  }

  try {
    const medicines = await Promise.all(
      getArrayOfMedicineIDS.map(async (element) => {
        const medicine = await Medicine.findOne({ _id: element.medicine_id });

        if (medicine) {
          return medicine;
        } else {
          return null;
        }
      })
    );

    const foundMedicines = medicines.filter((medicine) => medicine !== null);

    if (foundMedicines.length > 0) {
      res.status(200).json(foundMedicines);
    } else {
      res.status(404).json({ error: "Medicines not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const AddToCart = async (req, res) => {
  const userName = req.params.userName;
  const medicineId = req.params.medicineId;
  const quantity = req.params.quantity;

  try {
    const medicine = await Medicine.findById({ _id: medicineId });

    if (!medicine) {
      return res.status(404).json({ success: false, data: null, message: "Medicine not found" });
    }

    if (medicine.quantity === 0) {
      // Send email notification to pharmacist
      sendMailNotification(medicine.medicineName);
      
      return res.status(404).json({ success: false, data: null, message: "Medicine is out of stock" });
    }

    // Check if the requested quantity is available
    if (quantity > medicine.quantity) {
      return res.status(400).json({ success: false, data: null, message: "Insufficient stock for the requested quantity" });
    }

    // Update the medicine quantity and sales
    medicine.quantity -= quantity;
    medicine.sales += quantity;
    await medicine.save();

    // Add the medicine to the user's cart
    const user = await Patient.findOne({ username: userName });

    const medicineIndex = user.cart.medicines.findIndex(
      (medicine) => medicine.medicine_id.toString() === medicineId
    );

    if (medicineIndex !== -1) {
      // Medicine is in the cart, update the quantity
      user.cart.medicines[medicineIndex].quantity += quantity;
    } else {
      // Medicine is not in the cart, add it
      user.cart.medicines.push({ medicine_id: medicineId, quantity });
    }

    // Update total price, net price, and save the user
    user.cart.totalPrice += medicine.price * quantity;
    user.cart.netPrice = user.cart.totalPrice - (user.cart.totalPrice * (user.cart.discount || 0));

    await user.save();

    return res.status(200).json({ success: true, data: user, message: "Medicine added to cart successfully" });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, data: null, error: "Internal server error" });
  }
};

// Function to send mail notification
const sendMailNotification = (medicineName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'el7a2ni.virtual@gmail.com',
      pass: 'zijy ztiz drcn ioxq'
    }
  });

  const mailOptions = {
    from: 'el7a2ni.virtual@gmail.com',
    to: 'pharmacypharmcist@gmail.com',
    subject: 'Medicine Out of Stock Notification',
    text: `The medicine "${medicineName}" is now out of stock. Please update the inventory.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
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
  AddToCart,
  getArrayOfMedicine
};
