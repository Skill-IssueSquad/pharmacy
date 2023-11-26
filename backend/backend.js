require("dotenv").config();
const cors = require("cors");
const patientRoutes = require("./src/routes/medicine");
const medicineRouter = require("./src/routes/medicines");
const PatientRegisteration = require("./src/routes/patientRegisteration");
const PharmacistRegisteration = require("./src/routes/pharmacistRegisteration");
const pharmacistRequestRouter = require("./src/routes/PharmacistRequestRouter");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const {
  authAdmin,
  authPharmacist,
  authPharmacistRequest,
  authPatient,
} = require("./src/middleware/Authentication");
const accountRouter = require("./src/routes/AccountRouter");
const patientCart = require("./src/routes/Patient");

//for iamages
const multer = require("multer");

const upload = multer({
  dest: "./upload/images",
});

app.use("/images", express.static("./images"));

app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Server Started"));
  })
  .catch((err) => console.log(err));

app.use(express.json());

const AdminRouter = require("./src/routes/AdminRouter");
//app.use("/admin", authAdmin, AdminRouter);
app.use("/admin", AdminRouter);
//app.use("/pharmacist/medicines", authPharmacist,  medicineRouter);
app.use("/pharmacist/medicines", medicineRouter);
require("dotenv").config();

app.use("/register/patient", PatientRegisteration);
app.use("/register/pharmacist", PharmacistRegisteration);

//app.use("/pharmacistRequest", authPharmacistRequest,pharmacistRequestRouter)
app.use("/pharmacistRequest", pharmacistRequestRouter);

app.use("/account", accountRouter);

app.use("/medicine", patientRoutes);

app.use("/patient", patientCart);
