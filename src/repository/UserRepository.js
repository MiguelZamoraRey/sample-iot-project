const { connectMongo } = require('../utils/mongoConfig');
const UserSchema = require('../models/User');
let User = null;

const getModel = async () => {
  const mongoConnection = await connectMongo();
  if (User === null) {
    User = await mongoConnection.model('User', UserSchema);
  }
  return User;
};

const findUsers = async (query) => {
  try {
    const User = await getModel();
    const result = await User.find(query).sort({ name: 1 }).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findUsers: ', JSON.stringify(error));
    throw error;
  }
};

const findUser = async (query) => {
  try {
    const User = await getModel();
    const result = await User.findOne(query).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findUser: ', JSON.stringify(error));
    throw error;
  }
};

const insertUser = async (data) => {
  try {
    const User = await getModel();
    const result = await User.create(data).lean();
    return result;
  } catch (error) {
    console.log('ERROR insertUser: ', JSON.stringify(error));
    throw error;
  }
};

const updateUser = async (filter, data) => {
  try {
    const User = await getModel();
    const result = await User.findOneAndUpdate(filter, data, {
      new: true,
    }).lean();
    return result;
  } catch (error) {
    console.log('ERROR updateUser: ', JSON.stringify(error));
    throw error;
  }
};

const deleteUser = async (filter) => {
  try {
    const User = await getModel();
    const result = await User.findOneAndRemove(filter).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR deleteUser: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  findUsers,
  findUser,
  insertUser,
  updateUser,
  deleteUser,
};
