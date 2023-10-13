const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
        //ref: "Medicines",
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
            //ref: "Medicines",
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
