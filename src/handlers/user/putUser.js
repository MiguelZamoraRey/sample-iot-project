const { headers } = require('../../utils/headersConstants');
const { changeUser } = require('../../controllers/UserController');

exports.handler = async (event, context) => {
  const { httpMethod, pathParameters, body } = event;
  const { id } = pathParameters;
  const data = JSON.parse(body);

  if (httpMethod !== 'PUT') {
    throw new Error(
      `getMethod only accept PUT method, you tried: ${httpMethod}`
    );
  }

  if (!id) {
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

  try {
    context.callbackWaitsForEmptyEventLoop = false;

    const result = await changeUser(id, data);

    if (result) {
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
