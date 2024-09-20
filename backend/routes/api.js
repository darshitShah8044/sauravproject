const express = require("express");
const informationMaster = require("../models/informationMaster");
const Item = require("../models/Item");
const DiamondStock = require("../models/diamondStock");
const router = express.Router();

router.post("/item", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    console.log("Data received.");
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

// GET endpoint to fetch diamond stock with optional filters
router.get("/getDiamond", async (req, res) => {
  console.log("Getting data..");
  try {
    let query = {};

    // Check and set filters based on query parameters
    if (req.query.id) {
      query._id = req.query.id;
    }
    if (req.query.shape) {
      query.Shape = { $regex: new RegExp(req.query.shape, "i") };
    }
    if (req.query.size) {
      query.Size = { $regex: new RegExp(req.query.size, "i") }; // Assuming size can be a range
    }
    if (req.query.color) {
      query.Color = { $regex: new RegExp(req.query.color, "i") };
    }
    if (req.query.clarity) {
      query.Clarity = { $regex: new RegExp(req.query.clarity, "i") };
    }
    if (req.query.lab) {
      query.Lab = { $regex: new RegExp(req.query.lab, "i") };
    }

    // Fetch all diamonds if no filters are provided, or filtered results if query params are passed
    const diamonds = await DiamondStock.find(query);
    console.log("dss");
    console.log(diamonds);
    res.status(200).json(diamonds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
