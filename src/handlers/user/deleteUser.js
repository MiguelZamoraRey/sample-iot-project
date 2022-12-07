const { headers } = require('../../utils/headersConstants');

const { removedPermanentlyUser } = require('../../controllers/UserController');

exports.handler = async (event, context) => {
  const { httpMethod, pathParameters, queryStringParameters } = event;
  const { id } = pathParameters;

  console.log(id);

  if (httpMethod !== 'DELETE') {
    console.log(
      `getMethod only accept DELETE method, you tried: ${httpMethod}`
    );
    throw new Error(
      `getMethod only accept DELETE method, you tried: ${httpMethod}`
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
        statusMessage: 'Bad Request',
      }),
    };
  }

  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const result = await removedPermanentlyUser(id);

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
