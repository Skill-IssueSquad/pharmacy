const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistRequestSchema = new Schema({
  status: {
    type: String,
    enum: ["Pending", "Missing Documents", "Accepted", "Rejected"],
    default: "Pending",
  },
  username: {
    type: String,
    required: true,
    unique: true,
    //trim: true,
    //minlength: 3,
    //maxlength: 20, wah
  },
  name: {
    type: String,
    required: true,
    //trim: true,
    //minlength: 3,
    //maxlength: 20, wah
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //trim: true,
    //minlength: 3,
    //maxlength: 20, wah
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliationHospital: {
    type: String,
    required: false,
  },
  educationalBackground: String,
  documents: [
    {
      documentType: {
        type: String,
        required: true,
      },
      documentName: {
        type: String,
        required: true,
      },
      documentUrl: {
        type: String,
        required: true,
      },
    },
  ],
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  }
});

const PharmacistRequest = mongoose.model(
  "PharmacistRequest",
  pharmacistRequestSchema
);
module.exports = PharmacistRequest;
