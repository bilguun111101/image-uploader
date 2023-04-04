const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const uploadBucket = 'leafbbilguunawstutorial';
const URL_EXPIRATION_SECONDS = 3000000;

exports.handler = async(event) => {
  console.log(event);
  const params = {
    Bucket: uploadBucket,
    Key: "img.png",
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/png'
  }

  return new Promise((reslove, reject) => {
    const uploadUrl = s3.getSignedUrl('putObject', params);
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ uploadUrl })
    }
    reslove(response);
  })
}

// exports.recordsCheck = async(event) => {
//   console.log(event);
// }
