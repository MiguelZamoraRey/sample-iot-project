const { headers } = require('../../utils/headersConstants');
const { createDevice } = require('../../controllers/DeviceController');
const {
  findPreregister,
  updatePreregister,
} = require('../../repository/PreregisterRepository');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  const { httpMethod, body } = event;
  const { wifi, chars, localIp, macAddress } = JSON.parse(body);

  console.log('params', body);

  if (httpMethod !== 'POST') {
    throw new Error(
      `getMethod only accept POST method, you tried: ${httpMethod}`
    );
  }

  try {
    context.callbackWaitsForEmptyEventLoop = false;

    if (wifi && chars && localIp && macAddress) {
      let preregister = await findPreregister({
        wifi: data.wifi,
        chars: data.chars,
        used: false,
      });

      if (preregister) {
        let dataToSave = {
          deviceId: uuidv4(),
          userId: preregister.userId,
          localIp: localIp,
          mac: macAddress,
          activationDate: Date.now(),
          imageRepository: '',
          projectId: preregister.projectId,
        };

        const result = await createDevice(dataToSave);

        const deleteResult = updatePreregister(
          { _id: preregister_id },
          { ...preregister, used: true }
        );
        console.log(`delete preregister Result:`, deleteResult);

        if (result) {
          console.log(result.deviceId);
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify({
              data: result,
              statusMessage: 'OK',
            }),
          };
        }
      } else {
        console.log('No preregister found');
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            data: result,
            statusMessage: 'Not preregister found',
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
