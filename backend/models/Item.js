const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  num: { type: String, required: true },
  stockID: { type: String },
  ourStock: { type: String },
  lab: { type: String }, // Enum for limited values
  certificate: { type: String },
  companyName: { type: String },
  shape: { type: String },
  size: { type: Number },
  color: { type: String },
  clarity: { type: String },
  cut: { type: String },
  pol: { type: String },
  sym: { type: String },
  fl: { type: String },
  rap: { type: Number },
  bDis: { type: Number },
  bPC: { type: Number }, // Will be calculated
  bAmount: { type: Number }, // Will be calculated
  sellDis: { type: Number },
  sellPC: { type: Number }, // Will be calculated
  amount: { type: Number }, // Will be calculated
  fivePercent: { type: Number }, // Will be calculated
  labCost: { type: Number },
  otherCh: { type: Number },
  expoC: { type: Number },
  totalSell: { type: Number },
  rate: { type: Number },
  rsAmount: { type: Number },
  billAmount: { type: Number },
  expoRate: { type: Number },
  broker: { type: String },
  expoNum: { type: String },
  through: {
    type: String,
  }, // Enum for limited values
  type: { type: String }, // Enum for limited values
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
