require("dotenv").config();
const cors = require("cors");
const patientRoutes = require("./src/routes/medicine");
const medicineRouter = require("./src/routes/medicines");
const PatientRegisteration = require("./src/routes/patientRegisteration");
const PharmacistRegisteration = require("./src/routes/pharmacistRegisteration");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
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
    app.listen(8000, () => console.log("Server Started"));
  })
  .catch((err) => console.log(err));

app.use(express.json());

const AdminRouter = require("./src/routes/AdminRouter");
app.use("/admin", AdminRouter);
;

app.use("/pharmacist/medicines", medicineRouter);
require("dotenv").config();

app.use("/register/patient", PatientRegisteration);
app.use("/register/pharmacist", PharmacistRegisteration);

app.use("/medicine", patientRoutes);

app.use("/patient",patientCart);

