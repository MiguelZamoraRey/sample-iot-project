const mongoose = require('mongoose');

var PreregisterSchema = new mongoose.Schema(
  {
    wifi: String,
    chars: String,
    used: Boolean,
    userId: String,
    projectId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = PreregisterSchema;
