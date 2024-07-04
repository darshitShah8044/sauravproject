const mongoose = require("mongoose");

const infoTableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

module.exports = mongoose.model("infoTableSchema", infoTableSchema);
