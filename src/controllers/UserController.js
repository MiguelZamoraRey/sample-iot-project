const {
  insertUser,
  updateUser,
  findUsers,
  findUser,
  deleteUser,
} = require('../repository/UserRepository');

const {
  insertOrganization,
  findOrganizations,
} = require('../repository/OrganizationRepository');

const createUser = async (data) => {
  try {
    return await insertUser(data);
  } catch (error) {
    console.log('ERROR createUser: ', JSON.stringify(error));
    throw error;
  }
};

const registerUserAndOrganization = async (data) => {
  try {
    let { organizationName } = data;
    let organization = await findOrganizations({ name: organizationName });
    if (!organization) {
      let user = await insertUser(data);
      await insertOrganization({
        name: organizationName,
        userAdmin: user._id,
        users: [user._id],
      });
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log('ERROR createUser: ', JSON.stringify(error));
    throw error;
  }
};

const changeUser = async (id, data) => {
  try {
    return await updateUser({ _id: id }, data);
  } catch (error) {
    console.log('ERROR changeUser: ', JSON.stringify(error));
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await findUser({ _id: id });
  } catch (error) {
    console.log('ERROR getUserById: ', JSON.stringify(error));
    throw error;
  }
};

const getUsers = async (id) => {
  try {
    return await findUsers({});
  } catch (error) {
    console.log('ERROR getUserById: ', JSON.stringify(error));
    throw error;
  }
};

const removedPermanentlyUser = async (id) => {
  try {
    return await deleteUser({ _id: id });
  } catch (error) {
    console.log('ERROR removedPermanentlyUser: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  createUser,
  registerUserAndOrganization,
  changeUser,
  getUserById,
  getUsers,
  removedPermanentlyUser,
};
