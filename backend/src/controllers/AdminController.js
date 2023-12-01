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

const viewallordersandcreatesalesreport = async (req, res) => {  //notused probably useless
  try {
    // Fetch all patients with their orders, populating the 'orders.cart.medicines.medicine_id' field
    const patients = await Patient.find({}, "username orders").populate({
      path: 'orders.cart.medicines.medicine_id',
      model: 'Medicines', // Use the actual model name of your Medicines schema
    });

    // Create an object to store sales data
    const salesData = {};

    // Extract and return the required fields for each sold medicine
    patients.forEach((patient) => {
      patient.orders.forEach((order) => {
        order.cart.medicines.forEach((medicine) => {
          const medicineId = medicine.medicine_id._id.toString();

          // Initialize sales data if not present
          if (!salesData[medicineId]) {
            salesData[medicineId] = {
              medicine_id: medicine.medicine_id._id,
              medicineName: medicine.medicine_id.medicineName,
              date: order.date,
              quantity: 0,
              totalPrice: 0,
            };
          }

          // Update sales data for the current medicine
          salesData[medicineId].quantity += medicine.quantity;
          salesData[medicineId].totalPrice += medicine.medicine_id.price * medicine.quantity;
        });
      });
    });

    // Create sales reports based on the collected data
    const salesReports = Object.values(salesData).map((data) => ({
      medicine_id: data.medicine_id,
      medicineName: data.medicineName,
      date: data.date,
      quantity: data.quantity,
      totalPrice: data.totalPrice,
    }));

    // Create a sales report entry in the database
    const currentDate = new Date();
    const totalMedicineSales = salesReports.reduce((total, report) => total + report.totalPrice, 0);
    const newSalesReport = new SalesReport({
      date: currentDate,
      totalMedicineSales,
      medicineSales: salesReports.map((report) => ({
        medicine_id: report.medicine_id,
        quantity: report.quantity,
        totalPrice: report.totalPrice,
      })),
    });

    // Save the new sales report
    await newSalesReport.save();

    res.json(salesReports);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};



const viewRecentOrders = async (req, res) => {
  try {
    const searchTerm = req.query.search;

    const patients = await Patient.find({}, "username orders").populate({
      path: 'orders.cart.medicines.medicine_id',
      model: 'Medicines',
    });

    const salesReports = [];
    const dailySalesData = new Map();

    patients.forEach((patient) => {
      patient.orders.forEach((order) => {
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toISOString().split('T')[0];

        const orderSalesData = {};

        order.cart.medicines.forEach((medicine) => {
          const medicineId = medicine.medicine_id._id.toString();

          if (!orderSalesData[medicineId]) {
            orderSalesData[medicineId] = {
              medicine_id: medicine.medicine_id._id,
              medicineName: medicine.medicine_id.medicineName,
              date: formattedDate,
              quantity: 0,
              totalPrice: 0,
            };
          }

          orderSalesData[medicineId].quantity += medicine.quantity;
          orderSalesData[medicineId].totalPrice +=
            medicine.medicine_id.price * medicine.quantity;
        });

        Object.values(orderSalesData).forEach((data) => {
          const key = `${data.medicine_id}_${data.date}`;

          if (!dailySalesData.has(key)) {
            dailySalesData.set(key, {
              medicine_id: data.medicine_id,
              medicineName: data.medicineName,
              date: data.date,
              quantity: 0,
              totalPrice: 0,
            });
          }

          dailySalesData.get(key).quantity += data.quantity;
          dailySalesData.get(key).totalPrice += data.totalPrice;
        });
      });
    });

    const aggregatedSales = Array.from(dailySalesData.values());

    const filteredAggregatedSales = aggregatedSales.filter((report) =>
      report.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.json(filteredAggregatedSales);
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    res.status(500).send('Internal Server Error');
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

// Function to calculate total price for each medicine
function calculateTotalPrice(quantity, unitPrice) {
  return quantity * unitPrice;
}

module.exports = {
  viewallorders,
  viewRecentOrders,
  viewallordersandcreatesalesreport,//notused probably useless
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
