const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesReportSchema = new Schema({
  date: Date, // Monthly
  totalPrice: Number,
  totalMedicineSales: Number,
  medicineSales: [
    {
      medicine_id: Schema.Types.ObjectId,
     // ref: "Medicines",
      quantity: Number,
      totalPrice: Number,
    },
  ],
});

const SalesReport = mongoose.model("SalesReport", salesReportSchema);
module.exports = SalesReport;
