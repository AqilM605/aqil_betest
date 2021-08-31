const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },

    emailAddress: {
      type: String,
      required: true,
    },
    identityNumber: {
      type: Number,
      required: true,
    },

  },
  { timestamps: true }
);



module.exports = mongoose.model('User', usersSchema);
