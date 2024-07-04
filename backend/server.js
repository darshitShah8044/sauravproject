const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors package
const apiRoutes = require("./routes/api");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Use cors middleware
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

// Routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
