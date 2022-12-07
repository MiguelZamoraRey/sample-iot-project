const mongoose = require('mongoose');

var PicturesSchema = new mongoose.Schema(
  {
    organizationId: String,
    projectId: String,
    deviceId: {
      type: String,
      index: true,
    },
    uri: String,
  },
  {
    timestamps: true,
  }
);

module.exports = PicturesSchema;
