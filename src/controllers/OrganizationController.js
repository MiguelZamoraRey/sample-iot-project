const {
  insertOrganization,
  updateOrganization,
  findOrganizations,
  findOrganization,
  deleteOrganization,
} = require('../repository/OrganizationRepository');

const createOrganization = async (data) => {
  try {
    return await insertOrganization(data);
  } catch (error) {
    console.log('ERROR createOrganization: ', JSON.stringify(error));
    throw error;
  }
};

const changeOrganization = async (id, data) => {
  try {
    return await updateOrganization({ _id: id }, data);
  } catch (error) {
    console.log('ERROR changeOrganization: ', JSON.stringify(error));
    throw error;
  }
};

const getOrganizationById = async (id) => {
  try {
    return await findOrganization({ _id: id });
  } catch (error) {
    console.log('ERROR getOrganizationById: ', JSON.stringify(error));
    throw error;
  }
};

const getOrganizations = async (id) => {
  try {
    return await findOrganizations({});
  } catch (error) {
    console.log('ERROR getOrganizationById: ', JSON.stringify(error));
    throw error;
  }
};

const getOrganizationsByUserId = async (userId) => {
  try {
    //TODO: que busque la organizacion que tenga este user id como principal o como user
    return await findOrganizations({ userAdmin: userId });
  } catch (error) {
    console.log('ERROR getOrganizationById: ', JSON.stringify(error));
    throw error;
  }
};

const removedPermanentlyOrganization = async (id) => {
  try {
    return await deleteOrganization({ _id: id });
  } catch (error) {
    console.log(
      'ERROR removedPermanentlyOrganization: ',
      JSON.stringify(error)
    );
    throw error;
  }
};

module.exports = {
  createOrganization,
  changeOrganization,
  getOrganizationById,
  getOrganizations,
  getOrganizationsByUserId,
  removedPermanentlyOrganization,
};
