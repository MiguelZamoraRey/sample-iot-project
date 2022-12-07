const mongoose = require('mongoose');

var DevicesSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      index: true,
    },
    userId: String,
    localIp: String,
    mac: String,
    activationDate: String,
    imageRepository: String,
    projectId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = DevicesSchema;
