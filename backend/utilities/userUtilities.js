const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')



// password hashing
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)
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
const otpGenerator = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP
}

const tokenGenerator = (id) => {
    console.log('token generator');
    const options = {
        expiresIn: '1h'
    };
    const token = jwt.sign({ userId: id }, process.env.JWTSECRET, options)
    return token
}
module.exports = {
    otpGenerator,
    sendOtpMail,
    securePassword,
    tokenGenerator,
}