const mongoose = require('mongoose');
const Devices = require('./Device');

var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    telf: String,
    address: String,
    cif: String,
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
