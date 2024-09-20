const mongoose = require("mongoose");

const DiamondStockSchema = new mongoose.Schema({
  stockId: { type: String },
  shape: { type: String },
  size: { type: String },
  weight: { type: String },
  color: { type: String },
  clarity: { type: String },
  cut: { type: String },
  pol: { type: String },
  sym: { type: String },
  flu: { type: String },
  reportNo: { type: String },
  measurement: { type: String },
  discPercent: { type: String },
  rapPrice: { type: String },
  pricePerCt: { type: String },
  totalAmt: { type: String },
  rapTotal: { type: String },
  keyToSymbols: { type: String },
  lab: { type: String },
  depthPercent: { type: String },
  tablePercent: { type: String },
  girdle: { type: String },
  girdleCondition: { type: String },
  culetSize: { type: String },
  crnAg: { type: String },
  crnHt: { type: String },
  pavAg: { type: String },
  pavDp: { type: String },
  strLn: { type: String },
});

const DiamondStock = mongoose.model("diamondstocks", DiamondStockSchema);
module.exports = DiamondStock;
