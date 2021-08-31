const User = require("../models/user.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

exports.generateToken = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      emailAddress: req.body.emailAddress,
    });

    if (user) {
      const token = jwt.sign({ user: user }, process.env.SIGN_KEY, {
        expiresIn: "1d",
      });
      return res.json({ token });
    } else {
      return res.status(400).send({ message: "Credentials not found" });
    }
  } catch (error) {
    return res.status(500).send({
      message: res.error.message,
    });
  }
};
