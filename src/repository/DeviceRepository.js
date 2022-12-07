const { connectMongo } = require('../utils/mongoConfig');
const DeviceSchema = require('../models/Device');
let Device = null;

const getModel = async () => {
  const mongoConnection = await connectMongo();
  if (Device === null) {
    Device = await mongoConnection.model('Device', DeviceSchema);
  }
  return Device;
};

const findDevices = async (query) => {
  try {
    const Device = await getModel();
    const result = await Device.find(query).sort({ name: 1 }).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findDevices: ', JSON.stringify(error));
    throw error;
  }
};

const findDevice = async (query) => {
  try {
    const Device = await getModel();
    const result = await Device.findOne(query).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findDevice: ', JSON.stringify(error));
    throw error;
  }
};

const insertDevice = async (data) => {
  try {
    const Device = await getModel();
    const result = await Device.create(data);
    return result;
  } catch (error) {
    console.log('ERROR insertDevice: ', JSON.stringify(error));
    throw error;
  }
};

const updateDevice = async (filter, data) => {
  try {
    const Device = await getModel();
    const result = await Device.findOneAndUpdate(filter, data, {
      new: true,
    });
    return result;
  } catch (error) {
    console.log('ERROR updateDevice: ', JSON.stringify(error));
    throw error;
  }
};

const deleteDevice = async (filter) => {
  try {
    const Device = await getModel();
    const result = await Device.findOneAndRemove(filter).exec();
    return result;
  } catch (error) {
    console.log('ERROR deleteDevice: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  findDevices,
  findDevice,
  insertDevice,
  updateDevice,
  deleteDevice,
};
