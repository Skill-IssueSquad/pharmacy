const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicinesSchema = new Schema({
  medicineName: String,
  description: String,
  medicinalUsage: String,
  activeIngredients: [
    {
      ingredientName: String,
      ingredientAmount: String,
    },
  ],
  mainActiveIngredient : String,
  quantity: Number,
  price: Number,
  picture: String, // Assuming you store the file path
  sales: Number,
  isArchived: Boolean,
  requiresPrescription: Boolean,
  mainActiveIngredient : String
});

const Medicines = mongoose.model("Medicines", medicinesSchema);
module.exports = Medicines;
