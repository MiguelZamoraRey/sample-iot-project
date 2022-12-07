const AWS = require('aws-sdk');

const s3 = new AWS.S3();

/**
 * @description Uploads buffer as key to bucket
 * @param {buffer} buffer
 * @param {String} bucket
 * @param {String} name
 * @returns S3Result
 */
const uploadImageToBucket = async (image, bucket, key, imageType) => {
  try {
    let buffer = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    let params = {
      Bucket: bucket,
      Key: key,
      ACL: 'public-read',
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: `image/${imageType}`,
    };
    let result = await s3.putObject(params).promise();
    console.log('📷, ok');
    return 'ok';
  } catch (err) {
    console.log('💥ERROR:', err);
    return err;
  }
};

module.exports = {
  uploadImageToBucket,
};
