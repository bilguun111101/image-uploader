const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const nodemailer = require("nodemailer");
const client = new AWS.Rekognition();
const { v4: uuidv4 } = require('uuid');
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDB();

exports.handler = async(event) => {
    const Name = event.Records[0].s3.object.key;
    const Bucket = "leaf3bbilguunbucket";
    const params = {
        Image: {
            S3Object: {
                Bucket,
                Name
            },
        },
    }
    const response = await client.detectText(params).promise()
    const email = response.TextDetections.filter(el => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.DetectedText))
    const json = { email: email[0].DetectedText, id: uuidv4() };
    // const result = await db.putItem({
    //     TableName: 'emails',
    //     Item: marshall(json)
    // });
    // console.log(result);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "bilguun70b1123@gmail.com",
            pass: 'vjxvpyivcxrsgbeh'
        }
    })
    const mailOptions = {
        from: 'bilguun70b1123@gmail.com',
        to: email[0].DetectedText,
        subject: 'Sending Email using Node.js',
        text: "Successfull"
    }
    const result = transporter.sendMail(mailOptions, (error, info) => {
        if(error) return error;
        else return info;
    })
    console.log(result);
}