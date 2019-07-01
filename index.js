const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require('passport');
const cors = require("cors");

const app = express();

require("dotenv").config();
require("./config/dbconnection");

app.use(cors());
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const admins = require('./routes/admin');
app.use("/api/v1/admin", admins);

const volunteers = require('./routes/volunteer');
app.use("/api/v1/volunteer", volunteers);

const contactForm = require('./routes/contactForm');
app.use('/api/v1/contactForm', contactForm);

app.get("*", (req, res) => {
  res.json({ message: "API not found!" });
});

app.listen(process.env.PORT, err => {
  if (err) {
    console.log("Error in running server..");
    return;
  }
  console.log(
    `Server is up and running on http://localhost:${process.env.PORT}`
  );
});
