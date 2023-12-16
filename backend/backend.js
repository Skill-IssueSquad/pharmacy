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
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//for iamages
const multer = require("multer");

const upload = multer({
  dest: "./upload/images",
});

app.use("/images", express.static("./images"));

app.use(
  cors({
    origin: "http://localhost:3001", // Replace with the actual origin of your frontend
    credentials: true, // Allow credentials (cookies, etc.) to be sent
  })
);

app.use(cookieParser());
app.use("/documents", express.static("documents"));

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Server Started on Port " + process.env.PORT));
    
  })
  .catch((err) => console.log(err));

app.use(express.json());

const AdminRouter = require("./src/routes/AdminRouter");
app.use("/admin", authAdmin, AdminRouter);

app.use("/pharmacist/medicines", authPharmacist, medicineRouter);
require("dotenv").config();

app.use("/register/patient", PatientRegisteration);
app.use("/register/pharmacist", PharmacistRegisteration);

app.use("/pharmacistRequest", authPharmacistRequest, pharmacistRequestRouter);

app.use("/account", accountRouter);

app.use("/medicine", patientRoutes);

app.use("/patient", authPatient, patientCart);
//app.use("/patient",  patientCart);
