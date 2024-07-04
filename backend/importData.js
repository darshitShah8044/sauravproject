const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
// MongoDB connection URI

const dbName = "test";
const collectionName = "items";

// File path to your Excel file
const excelFilePath = path.resolve(
  __dirname,
  "C:/Users/JAY SURAT/Downloads/Master.xlsx"
);

// Function to read Excel file and import data to MongoDB
async function importData() {
  try {
    // Load Excel workbook
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[1]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON object array
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB");

    // Select database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert data into MongoDB
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted`);

    // Close connection
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}

// Call function to import data
importData();
