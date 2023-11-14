const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    //trim: true,
    //minlength: 3,
    //maxlength: 20, wah
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    //trim: true,
    //minlength: 3,
    //maxlength: 20, wah
  },
  password: String,
  dateOfBirth: Date,
  hourlyRate: Number,
  affiliationHospital: String,
  educationalBackground: String,
  walletBalance: Number,

  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  }

});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
module.exports = Pharmacist;
