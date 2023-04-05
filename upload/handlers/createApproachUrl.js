const AWS = require('aws-sdk');
const axios = require('axios');

const s3 = new AWS.S3();
const uploadBucket = 'leafbbilguunawstutorial';
const URL_EXPIRATION_SECONDS = 3000;

exports.handler = async(event) => {
  const {
    Key,
    Type: ContentType,
  } = JSON.parse(event.body);

  const params = {
    Bucket: uploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType
  }


  return new Promise((reslove, reject) => {
    const uploadUrl = s3.getSignedUrl('putObject', params);
    console.log(uploadUrl);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ uploadUrl })
    }
    reslove(response);
  })
}