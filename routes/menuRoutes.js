const express = require("express");
const router = express.Router();
const menuRoutes = require("../models/menuItem");

// GET route for fetching menu items
router.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log("Menu data fetched successfully");
    res.status(200).json(menuItems);
  } catch (err) {
    console.log("Error fetching menu data", err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

// POST route for adding a new menu item
router.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log("Menu item saved successfully");
    res.status(200).json(savedMenuItem);
  } catch (err) {
    console.log("Error saving menu item", err);
    res.status(500).json({ error: "Failed to save menu item" });
  }
});

module.exports = menuRoutes;
