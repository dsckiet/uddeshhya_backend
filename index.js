const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");
require("dotenv").config();
require("./config/dbconnection");

app.use(cors());
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, "public")));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/volunteer", require("./routes/volunteer"));

app.get("*", (req, res) => {
  res.json({ message: "api not found" });
});

app.listen(process.env.PORT, err => {
  if (err) {
    console.log("Error in running server");
    return;
  }
  console.log(
    `Server is up and running on http://localhost:${process.env.PORT}`
  );
});
