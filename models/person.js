const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"], // Correct spelling of 'enum'
    required: true, // Correct spelling of 'required'
  },
  mobile: {
    type: String,
    required: true, // Correct spelling of 'required'
  },
  email: {
    type: String,
    required: true, // Correct spelling of 'required'
    unique: true, // Ensures unique email addresses
  },
  address: {
    // Corrected spelling from 'adress' to 'address'
    type: String,
  },
  salary: {
    type: Number,
    required: true, // Correct spelling of 'required'
  },
});

// Create a model called 'Person' based on the schema
const Person = mongoose.model("Person", personSchema);

// Export the model for use in the server
module.exports = Person;
