const { headers } = require('../../utils/headersConstants');
const {
  getProjectById,
  changeProject,
} = require('../../controllers/ProjectController');

exports.handler = async (event, context) => {
  const { httpMethod, pathParameters, body } = event;
  const { deviceId, projectId } = JSON.parse(body);

  if (httpMethod !== 'POST') {
    throw new Error(
      `getMethod only accept POST method, you tried: ${httpMethod}`
    );
  }

  if (deviceId && projectId) {
    try {
      context.callbackWaitsForEmptyEventLoop = false;

      let project = await getProjectById(projectId);
      console.log(project);
      project.devices.push(deviceId);
      let result = await changeProject(project._id, project);

      if (result) {
        console.log(result);
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            data: result,
            statusMessage: 'OK',
          }),
        };
      }
    } catch (err) {
      console.log('ERROR: ', err);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          data: err,
          statusMessage: 'Internal Server Error',
        }),
      };
    }
  } else {
    console.log('Bad Request');
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        data: {
          message: 'Invalid parameters',
        },
        statusCode: 1,
        statusMessage: 'Bad Request',
      }),
    };
  }
};
