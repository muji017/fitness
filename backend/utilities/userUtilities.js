const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');



// password hashing
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
};




//Send otp to mail
const sendOtpMail = async (name, email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailpassword,
            },
        });
        const mailOptions = {
            from: process.env.emailUser,
            to: email,
            subject: 'For Reset password',
            html: '<p>Hi ' + name + ' ,one time password is' + otp + '</p>',
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('mail sent ', info.response);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};


//  otp generator
const otpGenerator=()=>{
var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
return OTP
}

module.exports={
    otpGenerator,
    sendOtpMail,
    securePassword,
}