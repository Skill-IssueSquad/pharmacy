const Patient = require("../models/Patient");

const submitPrescriptionToPharmacy = async (req, res) => {
  try {
    const { appID } = req.body;
    const response = await fetch(
      `http://localhost:8000/doctor/getPatient/${appID}`
    );
    const resData = await response.json();
    const patientClinic = resData.data;
    const username = patientClinic.username;
    var patientPharmacy = await Patient.findOne({ username: username });
    var message = "";
    console.log(patientPharmacy);
    if (!patientPharmacy) {
      //   patientPharmacy = new Patient({
      //     username: username,
      //     name: patientClinic.name,
      //     email: patientClinic.email,
      //     password: patientClinic.password,
      //     dateOfBirth: patientClinic.dateOfBirth,
      //     gender: patientClinic.gender,
      //     mobileNumber: patientClinic.mobileNumber,
      //     walletBalance: patientClinic.walletBalance,
      //     deliveryAddresses: patientClinic.deliveryAddresses,
      //     emergencyContact: patientClinic.emergencyContact,
      //   });

      return res.status(200).json({ message: "Patient not found" });
    }
    const send = {
      message: resData.message,
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
