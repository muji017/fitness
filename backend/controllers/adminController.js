const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config();
const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const utilities = require('../utilities/userUtilities')

// admin login

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const adminData = await adminModel.findOne({ email: email })
        console.log(adminData)
        if (adminData) {
            const passmatch = await bcrypt.compare(password, adminData.password);
            if (passmatch) {
                const token=utilities.tokenGenerator(adminData._id)

                console.log(adminData.email);
                res.status(200).json({ adminId: adminData._id, adminToken: token });

            }
            else {
                res.status(401).json({ message: "Email and password don't match" });
            }
        }
        else {
            res.status(404).json({ message: "Email not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// send otp to mail

const sendOtp = async (req, res) => {
    try {
        console.log("inside send otp")
        const { email } = req.body
        const adminData = await adminModel.findOne({ email: email })
        if (adminData) {
            const OTP = utilities.otpGenerator()
            console.log(OTP);
            adminData.otp = OTP
            await adminData.save()
            await utilities.sendOtpMail("Admin", adminData.email, OTP)
            res.status(200).json({ message: "Otp resend success" })
            setTimeout(async () => {
                await adminModel.updateOne(
                    { email: email },
                    { $unset: { otp: 1 } }
                );
            }, 60000);
        }
        else {
            res.status(404).json({ message: 'Email Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// resend otp to mail

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body
        console.log(email);
        const adminData = await adminModel.findOne({ email: email })
        console.log(adminData)
        const OTP = utilities.otpGenerator()
        console.log(OTP);
        adminData.otp = OTP
        await adminData.save()
        await utilities.sendOtpMail("Admin", adminData.email, OTP)
        res.status(200).json({ message: "Otp resend success" })
        setTimeout(async () => {
            await adminModel.updateOne(
                { email: email },
                { $unset: { otp: 1 } }
            );
        }, 60000);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// verify otp 

// otp matching in login and make user as verified

const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body
        console.log("mail in verify otp admin",email)
        const adminData = await adminModel.findOne({ email: email })
        console.log("in database", adminData.otp)
        console.log("in req.body", otp)
        if (adminData.otp === otp) {

            res.status(200).json({ email: adminData.email });
        }
        else {

            res.status(401).json({ message: "Otp mismatch" })
        }
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error" });
    }
}

// setting password 

const setPassword = async (req, res) => {
    try {
        const { email, password } = req.body
console.log(email,password);
        const adminData = await adminModel.findOne({ email: email })
        const securePassword=await utilities.securePassword(password)
        console.log(securePassword);
        adminData.password=securePassword
        await adminData.save()

        const token=utilities.tokenGenerator(adminData._id)
        console.log(adminData.email);
        res.status(200).json({ adminId: adminData._id, adminToken: token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    login,
    sendOtp,
    resendOtp,
    otpVerify,
    setPassword
}