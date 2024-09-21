const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    required: true,
    enum: ["sweet", "spicy", "sour"],
  },
  is_drink: {
    type: Boolean,
    required: true,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sale: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
