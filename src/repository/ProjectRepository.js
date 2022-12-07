const { connectMongo } = require('../utils/mongoConfig');
const ProjectSchema = require('../models/Project');
let Project = null;

const getModel = async () => {
  const mongoConnection = await connectMongo();
  if (Project === null) {
    Project = await mongoConnection.model('Project', ProjectSchema);
  }
  return Project;
};

const findProjects = async (query) => {
  try {
    const Project = await getModel();
    const result = await Project.find(query).sort({ name: 1 }).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findProjects: ', JSON.stringify(error));
    throw error;
  }
};

const findProject = async (query) => {
  try {
    const Project = await getModel();
    const result = await Project.findOne(query).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR findProject: ', JSON.stringify(error));
    throw error;
  }
};

const insertProject = async (data) => {
  try {
    const Project = await getModel();
    const result = await Project.create(data).lean();
    return result;
  } catch (error) {
    console.log('ERROR insertProject: ', JSON.stringify(error));
    throw error;
  }
};

const updateProject = async (filter, data) => {
  try {
    const Project = await getModel();
    const result = await Project.findOneAndUpdate(filter, data, {
      new: true,
    }).lean();
    return result;
  } catch (error) {
    console.log('ERROR updateProject: ', JSON.stringify(error));
    throw error;
  }
};

const deleteProject = async (filter) => {
  try {
    const Project = await getModel();
    const result = await Project.findOneAndRemove(filter).lean().exec();
    return result;
  } catch (error) {
    console.log('ERROR deleteProject: ', JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  findProjects,
  findProject,
  insertProject,
  updateProject,
  deleteProject,
};
