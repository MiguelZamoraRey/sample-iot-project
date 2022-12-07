const { headers } = require('../../utils/headersConstants');
const {
  getProjectsByOrganization,
} = require('../../controllers/ProjectController');

exports.handler = async (event, context) => {
  const { httpMethod, pathParameters, queryStringParameters } = event;
  const { organizationId } = pathParameters;

  if (httpMethod !== 'GET') {
    throw new Error(
      `getMethod only accept GET method, you tried: ${httpMethod}`
    );
  }

  try {
    context.callbackWaitsForEmptyEventLoop = false;

    const result = await getProjectsByOrganization(organizationId);

    if (result && result.length > 0) {
      console.log(result);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          data: result,
          statusMessage: 'OK',
        }),
      };
    } else {
      console.log('Not found');
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          data: {},
          statusMessage: 'Not found',
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
};
