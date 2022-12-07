const { headers } = require('../../utils/headersConstants');
const {
  registerUserAndOrganization,
} = require('../../controllers/UserController');

exports.handler = async (event, context) => {
  const { httpMethod, pathParameters, body } = event;
  const data = JSON.parse(body);

  if (httpMethod !== 'POST') {
    throw new Error(
      `getMethod only accept POST method, you tried: ${httpMethod}`
    );
  }

  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { organizationName } = data;

    if (organizationName) {
      const result = await registerUserAndOrganization(data);
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
      } else {
        console.log('This organization exists');
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({
            data: result,
            statusMessage: 'This organization name exists',
          }),
        };
      }
    } else {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          data: result,
          statusMessage: 'No organization name sended',
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
