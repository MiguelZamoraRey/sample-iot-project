const { headers } = require('../../utils/headersConstants');
const { createPicture } = require('../../controllers/PictureController');
const { getProjectById } = require('../../controllers/ProjectController');
const {
  getOrganizationById,
} = require('../../controllers/OrganizationController');
const {
  getDeviceByDeviceId,
  changeDevice,
} = require('../../controllers/DeviceController');
const { uploadImageToBucket } = require('../../utils/uploadImageToBucket');

exports.handler = async (event, context) => {
  const { httpMethod, pathParameters, body } = event;
  const { deviceId, image, localIp } = JSON.parse(body);

  if (httpMethod !== 'POST') {
    throw new Error(
      `getMethod only accept POST method, you tried: ${httpMethod}`
    );
  }

  if (!deviceId || !image) {
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

    let device = await getDeviceByDeviceId(deviceId);
    let project = null;
    let organization = null;

    if (localIp) {
      device.localIp = localIp;
      device = await changeDevice(device._id, device);
      console.log(`✔ local ip updated to ${localIp} for deice ${deviceId}`);
    } else {
      console.log('⚠ No local ip sended');
    }

    if (device.projectId) {
      project = await getProjectById(device ? device.projectId : null);
      organization = await getOrganizationById(
        project ? project.organizationId : null
      );
    } else {
      console.log(`Device ${deviceId} has no project assigned`);
      project = null;
      organization = null;
    }

    if (device && project && organization) {
      let imageType = image.split(';')[0].split('/')[1];
      let key = `${organization._id}/${project._id}/${
        device.deviceId
      }/${deviceId}_${Date.now()}.${imageType}`;
      let bucket = `khepriot-images`;

      const imageUploadResult = await uploadImageToBucket(
        image,
        bucket,
        key,
        imageType
      );
      console.log('📷 Result:', imageUploadResult);

      const result = await createPicture({
        organizationId: organization._id,
        projectId: project._id,
        deviceId: device.deviceId,
        uri: `https://khepriot-images.s3.eu-central-1.amazonaws.com/${key}`,
      });

      if (result) {
        console.log(JSON.stringify(result));
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
    } else {
      console.log(`Not Device or Project found for deviceId: ${deviceId}`);
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          data: {},
          statusMessage: `Not Device or Project found for deviceId: ${deviceId}`,
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
