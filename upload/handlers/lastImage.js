const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const client = new AWS.Rekognition();

exports.handler = async(event) => {
    const Bucket = "leaf3bbilguunbucket";
    const params = {
        Image: {
            S3Object: {
                Bucket,
                Name: "email.png"
            },
        },
    }
    const response = await client.detectText(params).promise()
    const email = response.TextDetections.filter(el => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.DetectedText))
    return await new Promise((resolve, reject) => {
        const invokeParams = {
            FunctionName: "upload-dev-send",
            Payload: JSON.stringify({
                email: email[0]
            })
        };

        lambda.invoke(invokeParams, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        })
    })
}