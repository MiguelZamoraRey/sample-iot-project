const mongoose = require('mongoose');
const Device = require('./Device');

var ProjectsSchema = new mongoose.Schema(
  {
    organizationId: {
      type: String,
      index: true,
    },
    name: String,
    description: String,
    address: String,
    devices: [String],
  },
  {
    timestamps: true,
  }
);

ProjectsSchema.virtual('deviceList', {
  ref: 'Device', // Modelo a usar
  localField: 'devices', // El campo en projectSchema
  foreignField: 'deviceId', // El campo en deviceSchema
});

module.exports = ProjectsSchema;
