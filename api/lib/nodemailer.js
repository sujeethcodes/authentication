require("dotenv").config()
const nodemailer =  require("nodemailer")
const response = require("../utils/res")
 
const sendEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
         service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
 
    });
 
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: response.emailOtpSubject,
        text: `${response.emailOtpTextContent} : ${otp}`
    };
 
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error occurred: ', error);
    }
}
 
module.exports =  sendEmail;