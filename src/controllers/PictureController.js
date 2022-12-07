const {
  insertPicture,
  updatePicture,
  findPictures,
  findPicture,
  deletePicture,
} = require('../repository/PictureRepository');

const createPicture = async (data) => {
  try {
    return await insertPicture(data);
  } catch (error) {
    console.log('ERROR createPicture: ', JSON.stringify(error));
    throw error;
  }
};

const changePicture = async (id, data) => {
  try {
    return await updatePicture({ _id: id }, data);
  } catch (error) {
    console.log('ERROR changePicture: ', JSON.stringify(error));
    throw error;
  }
};

const getPictureById = async (id) => {
  try {
    return await findPicture({ _id: id });
  } catch (error) {
    console.log('ERROR getPictureById: ', JSON.stringify(error));
    throw error;
  }
};

const getPicturesByDevice = async (deviceId) => {
  try {
    return await findPictures({ deviceId: deviceId });
  } catch (error) {
    console.log('ERROR getPictureById: ', JSON.stringify(error));
    throw error;
  }
};

const removedPermanentlyPicture = async (id) => {
  try {
    return await deletePicture({ _id: id });
  } catch (error) {
    console.log('ERROR removedPermanentlyPicture: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  createPicture,
  changePicture,
  getPictureById,
  getPicturesByDevice,
  removedPermanentlyPicture,
};
