const { headers } = require('../../utils/headersConstants');
const { getPictureById } = require('../../controllers/PictureController');

exports.handler = async (event, context) => {
  const { httpMethod, pathParameters, queryStringParameters } = event;
  const { id } = pathParameters;

  if (httpMethod !== 'GET') {
    throw new Error(
      `getMethod only accept GET method, you tried: ${httpMethod}`
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

    const result = await getPictureById(id);

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
