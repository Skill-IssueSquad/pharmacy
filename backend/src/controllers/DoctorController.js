const Patient = require("../models/Patient");
const Medicine = require("../models/Medicines");
const submitPrescriptionToPharmacy = async (req, res) => {
  try {
    const { appID, myMedicines } = req.body;
    const response = await fetch(
      `http://localhost:8000/doctor/getPatient/${appID}`
    );
    const resData = await response.json();
    const patientClinic = resData.data.patient;
    const discount = resData.data.discount / 100;
    const username = patientClinic.username;
    var patientPharmacy = await Patient.findOne({ username: username });
    console.log("Before changes : ", patientPharmacy);
    var message = "";
    var hadNoAccount = false;
    //console.log(patientPharmacy);
    if (!patientPharmacy) {
      hadNoAccount = true;
      patientPharmacy = new Patient({
        username: username,
        name: patientClinic.name,
        email: patientClinic.email,
        password: patientClinic.password,
        dateOfBirth: patientClinic.dateOfBirth,
        gender: patientClinic.gender,
        mobileNumber: patientClinic.mobileNumber,
        walletBalance: patientClinic.walletBalance,
        deliveryAddresses: [],
        emergencyContact: {
          fullName: patientClinic.emergencyContact.fullName,
          mobileNumber: patientClinic.emergencyContact.mobileNumber,
          relationToPatient: "relative",
        },
        cart: {
          medicines: [],
          totalPrice: 0,
          discount: 0,
          netPrice: 0,
        },
        orders: [],
        otp: patientClinic.otp,
        otpExpiry: patientClinic.otpExpiry,
      });
    }
    const medicines = [];
    for (let i = 0; i < myMedicines.length; i++) {
      // console.log(myMedicines[i]);
      console.log(myMedicines[i]._id);
      medicines.push({
        medicine_id: myMedicines[i]._id,
        quantity: 1,
      });
    }
    const totalPrice = myMedicines.reduce(
      (total, medicine) => total + medicine.price,
      0
    );
    const netPrice = totalPrice - totalPrice * discount;
    if (hadNoAccount) {
      patientPharmacy.cart = {
        medicines,
        totalPrice,
        discount,
        netPrice,
      };
    } else {
      for (let i = 0; i < medicines.length; i++) {
        let found = patientPharmacy.cart.medicines.find((med) => {
          // console.log("*******************");
          // console.log(med.medicine_id.toString());
          // console.log(medicines[i]);

          // console.log(
          //   `${med.medicine_id.toString()}` === medicines[i].medicine_id
          // );
          // console.log("*******************");
          return `${med.medicine_id.toString()}` === medicines[i].medicine_id;
        });

        if (found) {
          found.quantity += 1;
          console.log("found");
        } else {
          patientPharmacy.cart.medicines.push({ ...medicines[i], quantity: 1 });
          console.log("not found");
        }
      }

      patientPharmacy.cart.totalPrice = patientPharmacy.cart.medicines.reduce(
        (total, medicine) => total + medicine.price * medicine.quantity,
        0
      );
      console.log(patientPharmacy.cart.totalPrice);
      patientPharmacy.cart.discount = discount;
      patientPharmacy.cart.netPrice =
        patientPharmacy.cart.totalPrice -
        patientPharmacy.cart.totalPrice * patientPharmacy.cart.discount;
    }
    console.log("After changes : ", patientPharmacy);
    if (hadNoAccount) {
      await patientPharmacy.save();
    } else {
      await Patient.findByIdAndUpdate(patientPharmacy._id, {
        $set: {
          cart: {
            medicines: patientPharmacy.cart.medicines,
            totalPrice: patientPharmacy.cart.totalPrice,
            discount: patientPharmacy.cart.discount,
            netPrice: patientPharmacy.cart.netPrice,
          },
        },
      });
    }

    const send = {
      success: true,
      data: patientPharmacy,
      message: "Prescription submitted successfully",
    };
    res.status(200).json(send);
  } catch (error) {
    const send = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(send);
  }
};

module.exports = {
  submitPrescriptionToPharmacy,
};
