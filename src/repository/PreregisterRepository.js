const { connectMongo } = require('../utils/mongoConfig');
const PreregisterSchema = require('../models/Preregister');
let Preregister = null;

const getModel = async () => {
  const mongoConnection = await connectMongo();
  if (Preregister === null) {
    Preregister = await mongoConnection.model('Preregister', PreregisterSchema);
  }
  return Preregister;
};

const findPreregisters = async (query) => {
  try {
    const Preregister = await getModel();
    const result = await Preregister.find(query).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findPreregister: ', JSON.stringify(error));
    throw error;
  }
};

const findPreregister = async (query) => {
  try {
    const Preregister = await getModel();
    const result = await Preregister.findOne(query).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findPreregister: ', JSON.stringify(error));
    throw error;
  }
};

const insertPreregister = async (data) => {
  try {
    const Preregister = await getModel();
    const result = await Preregister.create(data).lean();
    return result;
  } catch (error) {
    console.log('ERROR insertPreregister: ', JSON.stringify(error));
    throw error;
  }
};

const updatePreregister = async (filter, data) => {
  try {
    const Preregister = await getModel();
    const result = await Preregister.findOneAndUpdate(filter, data).lean();
    return result;
  } catch (error) {
    console.log('ERROR updatePreregister: ', JSON.stringify(error));
    throw error;
  }
};

const deletePreregister = async (filter) => {
  try {
    const Preregister = await getModel();
    const result = await Preregister.findOneAndRemove(filter).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR deletePreregister: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  findPreregisters,
  findPreregister,
  insertPreregister,
  updatePreregister,
  deletePreregister,
};
