const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Admin Schema
const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
