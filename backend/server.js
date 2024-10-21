const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const crypto = require("crypto");
const xlsx = require("xlsx"); // Import xlsx for reading Excel files
const apiRoutes = require("./routes/api");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  });

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Define the collection name for storing files in GridFS
});

// Storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        // Get the current date and format it as ddmmyy
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yy = String(date.getFullYear()).slice(-2);
        const formattedDate = `${dd}${mm}${yy}`;

        // Get the original filename without the extension
        const originalName = path
          .parse(file.originalname)
          .name.replace(/ /g, "_");

        // Create the final filename
        const filename = `${originalName}_${formattedDate}${path.extname(
          file.originalname
        )}`;

        // File information to store
        const fileInfo = {
          filename: filename,
          bucketName: "uploads", // Same bucket name as the collection
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage }); // Configure multer to use the GridFS storage

// Function to read Excel file from GridFSBucket and import data to MongoDB
async function importDataFromGridFS(filename) {
  const gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads", // The name of the bucket for file storage
  });

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

      // Insert data into the diamondstocks collection
      const db = mongoose.connection.db; // Use the Mongoose connection for accessing the database
      const collection = db.collection("diamondstocks");
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

// GET route to fetch all data from the diamondstocks collection
app.get("/api/diamondstocks", async (req, res) => {
  try {
    const db = mongoose.connection.db; // Use the Mongoose connection for accessing the database
    const collection = db.collection("diamondstocks");

    // Fetch all documents from the diamondstocks collection
    const data = await collection.find().toArray();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found in diamondstocks" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from diamondstocks:", error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
});

// Routes
app.use("/api", apiRoutes);

// POST route to handle file upload and import data
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Call the import function with the uploaded file's name
  await importDataFromGridFS(req.file.filename);
  res
    .status(201)
    .json({ message: "File uploaded and data imported", file: req.file });
});

// GET route to fetch and download a file by filename
app.get("/api/files/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if the file is an Excel file
    if (
      file.contentType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.contentType === "application/vnd.ms-excel"
    ) {
      // Create a download stream for the file
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads", // Must match your bucket name
      });

      const downloadStream = bucket.openDownloadStreamByName(file.filename);

      // Pipe the read stream to the response to allow file download
      downloadStream.pipe(res);
    } else {
      res.status(404).json({
        err: "File is not an Excel file",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  }
});

// Route to list all files
app.get("/api/files", async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found" });
    }
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
