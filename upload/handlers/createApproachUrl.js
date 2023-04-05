const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const uploadBucket = 'leafbbilguunawstutorial';
const URL_EXPIRATION_SECONDS = 3000;

exports.handler = async(event) => {
  const {
    Key,
    Type,
    formData
  } = JSON.parse(event.body);
  console.log(event.body);
  const params = {
    Bucket: uploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/png'
  }

  return new Promise((reslove, reject) => {
    const uploadUrl = s3.getSignedUrl('putObject', params);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({ uploadUrl })
    }
    reslove(response);
  })
}