const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    accountNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    emailAddress: {
      type: String,
      unique: true,
      required: true,
    },
    identityNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
