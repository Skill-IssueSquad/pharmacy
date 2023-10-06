const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["M", "F", "Baby"],
  },
  mobileNumber: String,
  walletBalance: Number,
  deliveryAddresses: [
    {
      streetName: String,
      propertyNum: Number,
      floorNum: Number,
      apartNum: Number,
      extraLandMarks: String,
    },
  ],
  emergencyContact: {
    fullName: String,
    mobileNumber: String,
    relationToPatient: {
      type: String,
      enum: ["wife", "husband", "son", "daughter"],
    },
  },
  cart: {
    medicines: [
      {
        medicine_id: Schema.Types.ObjectId,
        ref: "Medicines",
        quantity: Number,
      },
    ],
    totalPrice: Number,
    discount: Number,
    netPrice: Number,
    // Perscription Missing
  },
  orders: [
    {
      status: String,
      date: Date,
      cart: {
        medicines: [
          {
            medicine_id: Schema.Types.ObjectId,
            ref: "Medicines",
            quantity: Number,
          },
        ],
        totalPrice: Number,
        discount: Number,
        netPrice: Number,
        // Perscription Missing
      },
      discount: Number,
      netPrice: Number,
      deliveryAddress: {
        streetName: String,
        propertyNum: Number,
        floorNum: Number,
        apartNum: Number,
        extraLandMarks: String,
      },
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
