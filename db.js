// Import Mongoose
const mongoose = require("mongoose");

// MongoDB URL
const MONGOURL = "mongodb://localhost:27017/person";

// Connecting to MongoDB
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Reference to the connection object
const db = mongoose.connection;

// Event listeners for the connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// FIX: Correctly attach the 'error' event handler
db.on("error", (error) => {
  console.log("Error connecting to MongoDB:", error);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Exporting the database connection
module.exports = db;
