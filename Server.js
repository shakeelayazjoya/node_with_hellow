const express = require("express");
const db = require("./db");
const Person = require("./models/person");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Middleware function to log requests
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      console.log("Received Credentials:", username, password);
      const user = await Person.findOne({ username }); // Await the database call
      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      }

      // Check password
      const isPasswordMatch = user.password === password; // Fixed typo 'ture' to 'true'

      if (!isPasswordMatch) {
        return done(null, false, { message: "Invalid username or password" });
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: true });
app.get("/", localAuthMiddleware, function (req, res) {
  res.send("Welcome to our hotel");
});

const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log(
    "Server is running and connected to DB successfully on port 3000"
  );
});
