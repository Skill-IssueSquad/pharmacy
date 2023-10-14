require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/PharmReqStaticData", express.static("PharmReqStaticData"));

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(8000, () => console.log("Server Started"));
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

const AdminRouter = require("./src/routes/AdminRouter");
app.use("/admin", AdminRouter);
