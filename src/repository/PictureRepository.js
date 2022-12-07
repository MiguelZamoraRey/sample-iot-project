const { connectMongo } = require('../utils/mongoConfig');
const PictureSchema = require('../models/Picture');
let Picture = null;

const getModel = async () => {
  const mongoConnection = await connectMongo();
  if (Picture === null) {
    Picture = await mongoConnection.model('Picture', PictureSchema);
  }
  return Picture;
};

const findPictures = async (query) => {
  try {
    const Picture = await getModel();
    const result = await Picture.find(query).sort({ name: 1 }).exec();
    return result;
  } catch (error) {
    console.log('ERROR findPictures: ', JSON.stringify(error));
    throw error;
  }
};

const findPicture = async (query) => {
  try {
    const Picture = await getModel();
    const result = await Picture.findOne(query).exec();
    return result;
  } catch (error) {
    console.log('ERROR findPicture: ', JSON.stringify(error));
    throw error;
  }
};

const insertPicture = async (data) => {
  try {
    const Picture = await getModel();
    const result = await Picture.create(data);
    return result;
  } catch (error) {
    console.log('ERROR insertPicture: ', JSON.stringify(error));
    throw error;
  }
};

const updatePicture = async (filter, data) => {
  try {
    const Picture = await getModel();
    const result = await Picture.findOneAndUpdate(filter, data, {
      new: true,
    });
    return result;
  } catch (error) {
    console.log('ERROR updatePicture: ', JSON.stringify(error));
    throw error;
  }
};

const deletePicture = async (filter) => {
  try {
    const Picture = await getModel();
    const result = await Picture.findOneAndRemove(filter).exec();
    return result;
  } catch (error) {
    console.log('ERROR deletePicture: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  findPictures,
  findPicture,
  insertPicture,
  updatePicture,
  deletePicture,
};
