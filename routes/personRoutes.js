const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// POST route using async/await
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save(); // Using async/await
    console.log("Data saved successfully");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log("Error saving person", err);
    res.status(500).json({ error: "Failed to save person" });
  }
});

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    console.log("data fetch");
    res.status(200).json(persons);
  } catch (err) {
    console.log("error fetching data", err);
  }
});

router.get("/:workType", async (req, res) => {
  const workType = req.params.workType;
  try {
    if (
      (workType == "chef") |
      (workType == "manager") |
      (workType == "waiter")
    ) {
      const response = await Person.find({ work: workType });
      console.log("reponse fetched ");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data i updated ");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error " });
  }
});

module.exports = router;
