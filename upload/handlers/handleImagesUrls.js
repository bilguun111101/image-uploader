const uploadBucket = 'leaf3bbilguunbucket';
const {
    S3Client, 
    ListObjectV2Command
} = require('@aws-sdk/client-s3');

exports.handler = async (event) => {
    const s3Client = new S3Client({});
    const params = new ListObjectV2Command({
        Bucket: uploadBucket
    })
    const {
        Name,
        Contents
    } = await s3Client.send(params);
    try {
        const list = { Name, Contents };
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ list })
        }
    } catch (error) {
        return {
            statusCode: 403,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({
                error
            })
        }
    }
}