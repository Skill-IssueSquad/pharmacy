// controllers/medicines.js

const Medicines = require('../models/Medicines');

async function addMedicine(req, res) {
  try {
    const {
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
    } = req.body;

    const newMedicine = new Medicines({
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

    await newMedicine.save();

    res.status(201).json(newMedicine);
  } catch (error) {
    console.error('Error adding medicine:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  addMedicine,
};
