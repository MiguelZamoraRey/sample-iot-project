const {
  insertDevice,
  updateDevice,
  findDevices,
  findDevice,
  deleteDevice,
} = require('../repository/DeviceRepository');

const createDevice = async (data) => {
  try {
    return await insertDevice(data);
  } catch (error) {
    console.log('ERROR createDevice: ', JSON.stringify(error));
    throw error;
  }
};

const changeDevice = async (id, data) => {
  try {
    return await updateDevice({ _id: id }, data);
  } catch (error) {
    console.log('ERROR changeDevice: ', JSON.stringify(error));
    throw error;
  }
};

const getDeviceById = async (id) => {
  try {
    return await findDevice({ _id: id });
  } catch (error) {
    console.log('ERROR getDeviceById: ', JSON.stringify(error));
    throw error;
  }
};

const getDeviceByDeviceId = async (deviceId) => {
  try {
    return await findDevice({ deviceId: deviceId });
  } catch (error) {
    console.log('ERROR getDeviceById: ', JSON.stringify(error));
    throw error;
  }
};

const getDevicesByProject = async (projectId) => {
  try {
    return await findDevices({ projectId: projectId });
  } catch (error) {
    console.log('ERROR getDeviceById: ', JSON.stringify(error));
    throw error;
  }
};

const removedPermanentlyDevice = async (id) => {
  try {
    return await deleteDevice({ _id: id });
  } catch (error) {
    console.log('ERROR removedPermanentlyDevice: ', JSON.stringify(error));
    throw error;
  }
};

const alive = async (id, ip) => {
  try {
    let device = await findDevice({ _id: id });
    device.localIp = ip;
    console.log(`📷 ${id} say: "im alive in ${ip}" `);
    if (device.localIp !== ip) {
      console.log(`📷 ${id} say: "Changing" `);
      return await updateDevice({ _id: id }, device);
    } else {
      return null;
    }
  } catch (error) {
    console.log('ERROR removedPermanentlyDevice: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  alive,
  createDevice,
  changeDevice,
  getDeviceById,
  getDeviceByDeviceId,
  getDevicesByProject,
  removedPermanentlyDevice,
};
