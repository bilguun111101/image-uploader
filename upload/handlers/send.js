const nodemailer = require('nodemailer');

exports.handler = async(event) => {
    const { DetectedText } = event;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: DetectedText,
            pass: 'vjxvpyivcxrsgbeh'
        }
    })

    const mailOptions = {
        from: 'bilguun70b1123@gmail.com',
        to: DetectedText,
        subject: 'Sending Email using Node.js',
        text: "Successfull"
    }

    const response = transporter.sendMail(mailOptions, (error, info) => {
        if(error) return error;
        else return info;
    })
    return response;
}