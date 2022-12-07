const { connectMongo } = require('../utils/mongoConfig');
const OrganizationSchema = require('../models/Organization');
let Organization = null;

const getModel = async () => {
  const mongoConnection = await connectMongo();
  if (Organization === null) {
    Organization = await mongoConnection.model(
      'Organization',
      OrganizationSchema
    );
  }
  return Organization;
};

const findOrganizations = async (query) => {
  try {
    const Organization = await getModel();
    const result = await Organization.find(query)
      .sort({ name: 1 })
      .lean()
      .exec();
    return result;
  } catch (error) {
    console.log('ERROR findOrganizations: ', JSON.stringify(error));
    throw error;
  }
};

const findOrganization = async (query) => {
  try {
    const Organization = await getModel();
    const result = await Organization.findOne(query).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findOrganization: ', JSON.stringify(error));
    throw error;
  }
};

const insertOrganization = async (data) => {
  try {
    const Organization = await getModel();
    const result = await Organization.create(data).lean();
    return result;
  } catch (error) {
    console.log('ERROR insertOrganization: ', JSON.stringify(error));
    throw error;
  }
};

const updateOrganization = async (filter, data) => {
  try {
    const Organization = await getModel();
    const result = await Organization.findOneAndUpdate(filter, data, {
      new: true,
    }).lean();
    return result;
  } catch (error) {
    console.log('ERROR updateOrganization: ', JSON.stringify(error));
    throw error;
  }
};

const deleteOrganization = async (filter) => {
  try {
    const Organization = await getModel();
    const result = await Organization.findOneAndRemove(filter).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR deleteOrganization: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  findOrganizations,
  findOrganization,
  insertOrganization,
  updateOrganization,
  deleteOrganization,
};
