const Admin = require("../models/Admin");
const Pharmacist = require("../models/Pharmacist");
const Patient = require("../models/Patient");
const Medicine = require("../models/Medicines");
const PharmReq = require("../models/PharmacistRequest");
const SalesReport  = require("../models/SalesReport");


//Add Admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAdmin = await Admin.create({
      username: username,
      password: password,
    });
    const reply = {
      success: true,
      data: newAdmin,
      message: "Admin added successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};

const viewAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      const reply = {
        success: false,
        data: null,
        message: "No admins found",
      };
      return res.status(404).json(reply);
    }
    const reply = {
      success: true,
      data: admins,
      message: "Admins retrieved successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};

const removeAdmin = async (req, res) => {
  const { username } = req.params;
  const removedAdmin = await Admin.deleteOne({ username: username })
    .then(() => {
      const reply = {
        success: true,
        data: removedAdmin,
        message: "Admin removed successfully",
      };
      return res.status(200).json(reply);
    })
    .catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });
};

const removePharmacist = async (req, res) => {
  const { username } = req.params;

  try {
    const removedPharm = await Pharmacist.deleteOne({
      username: username,
    }).catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });
    const reply = {
      success: true,
      data: removedPharm,
      message: "Pharmacist removed successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};

const removePatient = async (req, res) => {
  const { username } = req.params;

  try {
    const removedPatient = await Patient.deleteOne({
      username: username,
    }).catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });

    const reply = {
      success: true,
      data: removedPatient,
      message: "Patient removed successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};

const viewPharmacistInfo = async (req, res) => {
  //const { username } = req.params;

  try {
    const pharmacists = await Pharmacist.find({}).catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });

    if (!pharmacists) {
      const reply = {
        success: false,
        data: null,
        message: "No pharmacists found",
      };
      return res.status(404).json(reply);
    }
    const reply = {
      success: true,
      data: pharmacists,
      message: "Pharmacists retrieved successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      data: null,
    });
  }
};

const viewPatientInfo = async (req, res) => {
  //const { username } = req.params;

  try {
    const patients = await Patient.find({}).catch((error) => {
      const reply = {
        success: false,
        data: null,
        message: error.message,
      };
      return res.status(500).json(reply);
    });
    if (!patients) {
      const reply = {
        success: false,
        data: null,
        message: "No patients found",
      };
      return res.status(404).json(reply);
    }
    const reply = {
      success: true,
      data: patients,
      message: "Patients retrieved successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({}).catch((error) => {
      return res.status(500).json({
        success: false,
        error: error.message,
        data: null,
      });
    });
    return res.status(200).json({
      success: true,
      message: "All Medicines returned successfully",
      data: medicines,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      data: null,
    });
  }
};

const findMedicine = async (req, res) => {
  const { medicineName } = req.body;

  const medicine = await Medicine.findOne({ medicineName: medicineName }).catch(
    (error) => {
      return res.status(500).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  );

  if (!medicine) {
    return res.status(404).json({
      success: false,
      message: "Medicine not found",
      data: null,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Medicine returned successfully",
    data: medicine,
  });
};

const viewPharmacistRequests = async (req, res) => {
  try {
    const requests = await PharmReq.find();
    if (!requests) {
      const reply = {
        success: false,
        data: null,
        message: "No requests found",
      };
      return res.status(404).json(reply);
    }
    const reply = {
      success: true,
      data: requests,
      message: "Requests retrieved successfully",
    };
    return res.status(200).json(reply);
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};





const viewallorders = async (req, res) => {
  try {
    // Find all patients and populate the 'orders' field with necessary fields
    const patients = await Patient.find()
      .populate({
        path: 'orders.cart.medicines.medicine_id',
        model: 'Medicines', // Add this line to specify the model
        select: '_id medicineName price', // Add the fields you want to select from the Medicine model
      })
      .select('orders.date orders.cart.medicines');

    // Create a map to store the aggregated information for each medicine on a specific day
    const medicinesInfoMap = new Map();

    // Process each patient's orders
    patients.forEach(patient => {
      patient.orders.forEach(order => {
        const orderDate = new Date(order.date).toLocaleDateString();
        
        // Process each medicine in the order
        order.cart.medicines.forEach(medicine => {
          if (medicine.medicine_id) {
            const medicineKey = `${medicine.medicine_id._id || medicine.medicine_id}_${orderDate}`;
            
            if (!medicinesInfoMap.has(medicineKey)) {
              // Initialize the map entry for the medicine on the specific day
              medicinesInfoMap.set(medicineKey, {
                medicine_id: medicine.medicine_id._id || medicine.medicine_id,
                medicineName: medicine.medicine_id.medicineName,
                quantity: 0,
                totalPrice: 0,
                date: orderDate,
              });
            }

            // Update quantity and total price for the medicine on the specific day
            const medicineInfo = medicinesInfoMap.get(medicineKey);
            medicineInfo.quantity += medicine.quantity;
            medicineInfo.totalPrice += calculateTotalPrice(medicine.quantity, medicine.medicine_id.price);
          }
        });
      });
    });

    // Convert the map values to an array
    const medicinesInfo = Array.from(medicinesInfoMap.values());

    res.json(medicinesInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const viewallordersbymonth = async (req, res) => {
  try {
    const selectedMonth = req.query.month;

    // Find all patients and populate the 'orders' field with necessary fields
    const patients = await Patient.find()
      .populate({
        path: 'orders.cart.medicines.medicine_id',
        model: 'Medicines',
        select: '_id medicineName price',
      })
      .select('orders.date orders.cart.medicines');

    // Create a map to store the aggregated information for each medicine on a specific month
    const medicinesInfoMap = new Map();

    // Process each patient's orders
    patients.forEach((patient) => {
      patient.orders.forEach((order) => {
        const orderDate = new Date(order.date);
        const yearMonth = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}`;

        // Check if the order is for the selected month
        if (!selectedMonth || yearMonth === selectedMonth) {
          // Process each medicine in the order
          order.cart.medicines.forEach((medicine) => {
            if (medicine.medicine_id) {
              const medicineKey = `${medicine.medicine_id._id || medicine.medicine_id}_${yearMonth}`;

              if (!medicinesInfoMap.has(medicineKey)) {
                medicinesInfoMap.set(medicineKey, {
                  medicine_id: medicine.medicine_id._id || medicine.medicine_id,
                  medicineName: medicine.medicine_id.medicineName,
                  quantity: 0,
                  totalPrice: 0,
                  date: yearMonth,
                });
              }

              const medicineInfo = medicinesInfoMap.get(medicineKey);
              medicineInfo.quantity += medicine.quantity;
              medicineInfo.totalPrice += calculateTotalPrice(medicine.quantity, medicine.medicine_id.price);
            }
          });
        }
      });
    });

    const medicinesInfo = Array.from(medicinesInfoMap.values());

    res.json(medicinesInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to calculate total price for each medicine
function calculateTotalPrice(quantity, unitPrice) {
  return quantity * unitPrice;
}

module.exports = {
  viewallordersbymonth,
  viewallorders,

  viewAdmins,
  createAdmin,
  removeAdmin,
  removePharmacist,
  removePatient,
  viewPharmacistInfo,
  viewPatientInfo,
  getMedicines,
  findMedicine,
  viewPharmacistRequests,
};
