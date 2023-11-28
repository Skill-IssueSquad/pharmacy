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
    const searchTerm = req.query.search; // Get search term from query parameters

    // Fetch all patients with their orders, populating the 'orders.cart.medicines.medicine_id' field
    const patients = await Patient.find({}, "username orders").populate({
      path: 'orders.cart.medicines.medicine_id',
      model: 'Medicines',
    });

    // Create an array to store individual sales reports for each order
    const salesReports = [];

    // Iterate through patients and their orders
    patients.forEach((patient) => {
      patient.orders.forEach((order) => {
        // Create an object to store sales data for the current order
        const orderSalesData = {};

        order.cart.medicines.forEach((medicine) => {
          const medicineId = medicine.medicine_id._id.toString();

          // Initialize sales data if not present or if the date is different
          if (!orderSalesData[medicineId]) {
            orderSalesData[medicineId] = {
              medicine_id: medicine.medicine_id._id,
              medicineName: medicine.medicine_id.medicineName,
              date: order.date,
              quantity: 0,
              totalPrice: 0,
            };
          }

          // Update sales data for the current medicine
          orderSalesData[medicineId].quantity += medicine.quantity;
          orderSalesData[medicineId].totalPrice += medicine.medicine_id.price * medicine.quantity;
        });

        // Create sales report for the current order
        const orderSalesReport = Object.values(orderSalesData).map((data) => ({
          medicine_id: data.medicine_id,
          medicineName: data.medicineName,
          date: data.date,
          quantity: data.quantity,
          totalPrice: data.totalPrice,
        }));

        // Filter sales report based on the search term
        const filteredOrderSalesReport = orderSalesReport.filter(report =>
          report.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Add the filtered sales report to the overall array
        salesReports.push(...filteredOrderSalesReport);
      });
    });

    // Update existing sales report or create a new one for each order
    const currentDate = new Date();
    const totalMedicineSales = salesReports.reduce((total, report) => total + report.totalPrice, 0);

    for (const orderSalesReport of salesReports) {
      const salesReport = await SalesReport.findOneAndUpdate(
        { date: orderSalesReport.date }, // Provide the criteria to find the most recent sales report
        {
          date: orderSalesReport.date,
          totalMedicineSales,
          medicineSales: [orderSalesReport],
        },
        { new: true, upsert: true }
      );

      console.log('Sales report viewed and updated:', salesReport);
    }

    // Return the updated sales reports to the client
    res.json(salesReports);
  } catch (error) {
    console.error('Error fetching and updating recent orders:', error);
    res.status(500).send('Internal Server Error');
  }
};

const viewallorders = async (req, res) => {
  try {
    const { month } = req.query;
    console.log('Received month parameter:', month);

    // Construct a query object to filter orders by month
    const query = {};
    if (month) {
      const [year, monthNumber] = month.split('-');
      query['orders.date'] = {
        $gte: new Date(year, monthNumber - 1, 1),
        $lt: new Date(year, monthNumber, 1),
      };
    }

    const patients = await Patient.find(query, "username orders").populate({
      path: 'orders.cart.medicines.medicine_id',
      model: 'Medicines',
    });

    const medicineMap = new Map();

    patients.forEach(patient => {
      patient.orders.forEach(order => {
        const orderDate = order.date;
        const orderMonth = orderDate.getMonth() + 1;

        order.cart.medicines.forEach(medicine => {
          const medicineId = medicine.medicine_id._id;
          const key = `${medicineId}_${orderMonth}`;
          if (medicineMap.has(key)) {
            medicineMap.get(key).quantitySold += medicine.quantity;
          } else {
            medicineMap.set(key, {
              medicineName: medicine.medicine_id.medicineName,
              description: medicine.medicine_id.description,
              medicinalUsage: medicine.medicine_id.medicinalUsage,
              quantitySold: medicine.quantity,
              price: medicine.medicine_id.price,
              discount: order.discount,
              date: `${orderMonth}`,
            });
          }
        });
      });
    });

    const allMedicines = Array.from(medicineMap.values());

    res.json(allMedicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



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
