const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const uploadBucket = 'leaf3bbilguunawstutorial';
const URL_EXPIRATION_SECONDS = 400000;

exports.handler = async (event) => {
  const params = {
    Bucket: uploadBucket,
    Key: "img.png",
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/png'
  }

  return new Promise((resolve, reject) => {
    const uploadUrl = s3.getSignedUrl('putObject', params);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl,
      }),
    }
    resolve(response);
  })
};
