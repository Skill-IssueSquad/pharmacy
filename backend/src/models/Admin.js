const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Admin Schema
const adminSchema = new Schema({
  username: String,
  password: String
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;