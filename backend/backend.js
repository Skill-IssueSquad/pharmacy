require("dotenv").config();

//express app
const express = require("express");
const app = express();
const PatientRegisteration = require("./src/routes/patientRegisteration");
const PharmacistRegisteration = require("./src/routes/pharmacistRegisteration");
const mongoose = require("mongoose");
const cors = require("cors");

//cors
app.use(cors());

app.use(express.json());

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/register/patient", PatientRegisteration);
app.use("/register/pharmacist", PharmacistRegisteration);

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connection to DB successful, server started on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
