const express = require("express");
const informationMaster = require("../models/informationMaster");
const Item = require("../models/item");
const router = express.Router();

router.post("/item", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch items with optional filters
router.get("/item", async (req, res) => {
  try {
    let query = {};

    // Check and set filters based on query parameters
    if (req.query.companyName) {
      query.companyName = { $regex: new RegExp(req.query.companyName, "i") };
    }
    if (req.query.size) {
      query.size = parseFloat(req.query.size);
    }
    if (req.query.clarity) {
      query.clarity = { $regex: new RegExp(req.query.clarity, "i") };
    }

    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
