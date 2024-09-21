const express = require("express");
const db = require("./db");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use("/person", personRoutes);

app.use("/menu", menuRoutes);

app.get("/", function (req, res) {
  res.send("well come to our hotel ");
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log(
    "Server is running and connected to DB successfully on port 3000"
  );
});
