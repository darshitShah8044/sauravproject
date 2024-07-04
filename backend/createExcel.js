const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

// Data to write to Excel
const keys = [
  "num",
  "stockID",
  "ourStock",
  "lab",
  "certificate",
  "companyName",
  "shape",
  "size",
  "color",
  "clarity",
  "cut",
  "pol",
  "sym",
  "fl",
  "rap",
  "bDis",
  "bPC",
  "bAmount",
  "sellDis",
  "sellPC",
  "amount",
  "fivePercent",
  "labCost",
  "otherCh",
  "expoC",
  "totalSell",
  "rate",
  "rsAmount",
  "billAmount",
  "expoRate",
  "broker",
  "expoNum",
  "through",
  "type",
];

// Function to write keys to Excel
function writeKeysToExcel(keys, outputPath) {
  console.log("hi");
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const sheetName = "Sheet1";

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([keys]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Write the workbook to a file
    XLSX.writeFile(workbook, outputPath);

    console.log(`Excel file created at: ${outputPath}`);
  } catch (error) {
    console.error("Error writing Excel file:", error);
  }
}

// Specify the output path for the Excel file
const outputPath = path.join(__dirname, "keys.xlsx");

// Call function to write keys to Excel
writeKeysToExcel(keys, outputPath);
