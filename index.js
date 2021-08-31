require("dotenv").config("..env");
const express = require("express");
const cors = require("cors");
const app = express();
const dbUrl = process.env.DATABASE_URL;

var corsOptions = {
  origin: process.env.CORS,
};

app.use(express.static("public"));

// cors setup for app
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect to mongo DB
let mongoose = require("mongoose");
mongoose
  .connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to the ${dbUrl}!`);
  })
  .catch((err) => {
    console.log("Cannot connect to the database! \n", err);
    process.exit();
  });

// route section
module.exports = app;
require("./src/app/routes/auth.routes")(app);
require("./src/app/routes/users.routes")(app);
