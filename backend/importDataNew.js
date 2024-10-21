const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const xlsx = require("xlsx");
const dotenv = require("dotenv");

dotenv.config();

// MongoDB setup
const dbName = "test"; // Name of the database
const collectionName = "diamondstocks"; // Name of the collection for storing imported data
const mongoURI = process.env.MONGO_URI; // MongoDB connection URI
let gfsBucket; // Variable to hold the GridFSBucket instance

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  });

// Initialize GridFSBucket
const conn = mongoose.connection;
conn.once("open", () => {
  // Create a GridFSBucket instance
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: "uploads", // The name of the bucket for file storage
  });
  console.log("GridFSBucket initialized");

  // Example usage: Call the function after file upload
  const filename = "KOMAL_EXPORTS_GIA_STOCK_LIST_18-09-2024-2_300924.xlsx";
  importDataFromGridFS(filename);
});

// Function to read Excel file from GridFSBucket and import data to MongoDB
async function importDataFromGridFS(filename) {
  if (!gfsBucket) {
    console.error("GridFSBucket is not initialized yet");
    return;
  }

  try {
    console.log(`Attempting to download file: ${filename}`);

    // Buffer to store file chunks
    let buffer = [];

    // Retrieve the Excel file from GridFSBucket
    const downloadStream = gfsBucket.openDownloadStreamByName(filename);

    // Read the file stream
    downloadStream.on("data", (chunk) => {
      buffer.push(chunk); // Push chunks into buffer
      console.log("Received chunk of data");
    });

    downloadStream.on("end", async () => {
      console.log("Download stream ended, processing file...");

      // Join all buffer chunks and convert to a complete file buffer
      const fileBuffer = Buffer.concat(buffer);
      console.log("File buffer created, reading Excel...");

      // Load Excel workbook from buffer
      const workbook = xlsx.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet to JSON object array
      const data = xlsx.utils.sheet_to_json(worksheet);
      console.log("Excel data converted to JSON");

      // Convert all data fields to strings
      const stringData = data.map((row) => {
        const stringRow = {};
        for (const key in row) {
          stringRow[key] = String(row[key]); // Convert each value to string
        }
        return stringRow;
      });

      // Insert data into the new collection
      const db = mongoose.connection.db; // Use the Mongoose connection for accessing the database
      const collection = db.collection(collectionName);
      const result = await collection.insertMany(stringData);
      console.log(`${result.insertedCount} documents inserted`);
    });

    downloadStream.on("error", (err) => {
      console.error("Error reading file from GridFSBucket:", err);
    });
  } catch (error) {
    console.error("Error importing data from GridFSBucket:", error);
  }
}
