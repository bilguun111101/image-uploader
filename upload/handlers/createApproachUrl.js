const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const s3 = new AWS.S3();
const uploadBucket = 'leaf3bbilguunbucket';
const Expires = 3000;

exports.handler = async(event) => {
  const {
    Key,
    Type: ContentType,
  } = JSON.parse(event.body);

  const params = {
    Key,
    Expires,
    ContentType,
    Bucket: uploadBucket,
  }


  return await new Promise((reslove, reject) => {
    const uploadUrl = s3.getSignedUrl('putObject', params);
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