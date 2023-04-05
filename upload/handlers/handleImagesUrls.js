const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const uploadBucket = 'leafbbilguunawstutorial';

exports.handler = async (event) => {
    const params = {
        Bucket: uploadBucket
    };
    await s3.listObjectsV2(params, (err, data) => {
        if (err) {
            return {
                statusCode: 402,
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ err })
            }
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ data })
        }
    }).promise();
}