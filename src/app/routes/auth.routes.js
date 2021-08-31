const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
require("../config/auth.config");
const { checkIfEmptyBody } = require("../middleware/handlingError");

module.exports = (app) => {
  //route to generate token
  router.post("/token", checkIfEmptyBody, authController.generateToken);
  app.use("/api/auth", router);
};
