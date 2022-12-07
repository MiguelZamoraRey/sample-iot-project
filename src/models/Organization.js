const mongoose = require('mongoose');
const User = require('./User');

var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    userAdmin: String,
    users: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
