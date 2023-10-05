const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistRequestSchema = new Schema({
  status: Boolean,
  username: String,
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  hourlyRate: Number,
  affiliationHospital: String,
  educationalBackground: String,
  documents: [
    {
      documentType: String,
      documentName: String,
      documentFile: {
        data: Buffer,
        contentType: String,
      },
    },
  ],
});

const PharmacistRequest = mongoose.model(
  "PharmacistRequest",
  pharmacistRequestSchema
);
module.exports = PharmacistRequest;
