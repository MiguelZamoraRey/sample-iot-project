const { headers } = require('../../utils/headersConstants');
const { insertPreregister } = require('../../repository/PreregisterRepository');

exports.handler = async (event, context) => {
  const { httpMethod, body } = event;
  const data = JSON.parse(body);

  if (httpMethod !== 'POST') {
    throw new Error(
      `getMethod only accept POST method, you tried: ${httpMethod}`
    );
  }

  try {
    context.callbackWaitsForEmptyEventLoop = false;

    let dataToSave = {
      ...data,
      used: false,
    };

    const result = await insertPreregister(dataToSave);

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
};
