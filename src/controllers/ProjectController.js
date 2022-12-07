const {
  insertProject,
  updateProject,
  findProjects,
  findProject,
  deleteProject,
} = require('../repository/ProjectRepository');

const createProject = async (data) => {
  try {
    return await insertProject(data);
  } catch (error) {
    console.log('ERROR createProject: ', JSON.stringify(error));
    throw error;
  }
};

const changeProject = async (id, data) => {
  try {
    return await updateProject({ _id: id }, data);
  } catch (error) {
    console.log('ERROR changeProject: ', JSON.stringify(error));
    throw error;
  }
};

const getProjectById = async (id) => {
  try {
    return await findProject({ _id: id });
  } catch (error) {
    console.log('ERROR getProjectById: ', JSON.stringify(error));
    throw error;
  }
};

const getProjectsByOrganization = async (organizationId) => {
  try {
    return await findProjects({ organizationId: organizationId });
  } catch (error) {
    console.log('ERROR getProjectsByOrganizationId: ', JSON.stringify(error));
    throw error;
  }
};

const removedPermanentlyProject = async (id) => {
  try {
    return await deleteProject({ _id: id });
  } catch (error) {
    console.log('ERROR removedPermanentlyProject: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  createProject,
  changeProject,
  getProjectById,
  getProjectsByOrganization,
  removedPermanentlyProject,
};
