const Patient = require("../models/Patient");
const Medicine = require("../models/Medicines");
const Pharmacist = require("../models/Pharmacist");
const nodeMailer = require("nodemailer");

const sendEmailFunc = async (email, message, subject) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "el7a2ni.virtual@gmail.com",
      pass: "zijy ztiz drcn ioxq",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // call addNotificationFunc
  let res = await addNotificationFunc(email, subject, message);
  console.log(res.message);

  if (res.success) {
    return await transporter
      .sendMail({
        from: "SkillIssue <el7a2ni.virtual@gmail.com>",
        to: email,
        subject: subject,
        text: message,
      })
      .then((info) => {
        if (info) {
          console.log("email sent");
          return true;
        }
      })
      .catch((err) => {
        if (err) {
          console.log("it has an error");
          return false;
        }
      });
  } else {
    return false;
  }
};



const addNotificationFunc = async (email, title, notification) => {
  // Extract other health record properties from the request body

  try {
    // Fetch existing health records
    const patient = await Patient.findOne({ email });

    if (!patient) {
      console.log("Patient not found:", req.params.username);

      return {
        success: false,
        message: "Patient not found",
        data: null,
      };
    }
    let isSeen = false;
    patient.notifications.push({ isSeen, title, notification });

    const updatedPatient = await patient.save();

    return {
      success: true,
      message: "Notification added successfully",
      data: updatedPatient,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};



const submitPrescriptionToPharmacy = async (req, res) => {
  try {
    const { appID, myMedicines } = req.body;
    const response = await fetch(`http://localhost:8000/getPatient/${appID}`, {
      credentials: "include",
    });
    console.log("The response was : ", response);
    const resData = await response.json();
    console.log(resData);
    const patientClinic = resData.data.patient;
    const docName = resData.data.docName;
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
      patientPharmacy = await Patient.findByIdAndUpdate(patientPharmacy._id, {
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

    var subject = "Pharmacy Cart";
    var message = `Dear ${patientPharmacy.name},\n\nYour doctor ( ${docName} ) has added prescription medicines into your cart in the pharmacy.\n\nBest Regards,\nSkillIssue Team`;
    var email = patientPharmacy.email;
    let sent = await fetch("http://localhost:8000/notifyPatient", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, subject, email }),
    });
    if (!sent) {
      res.status(500).json({
        success: false,
        data: null,
        message: "Some error occurred while sending email.",
      });
      return;
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

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    var patientList = [];
    for (var patient of patients) {
      patientList.push({
        name: `${patient.name}(${patient.username})`,
        username: patient.username,
      });
    }
    const send = {
      success: true,
      data: patientList,
      message: "Patients fetched successfully",
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

const getPharmacist = async (req, res) => {
  try {
    const patients = await Pharmacist.find({});
    var patientList = [];
    for (var patient of patients) {
      patientList.push({
        name: `${patient.name}(${patient.username})`,
        username: patient.username,
      });
    }
    const send = {
      success: true,
      data: patientList,
      message: "Pharmacists fetched successfully",
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
  getPatients,
  getPharmacist,
};
