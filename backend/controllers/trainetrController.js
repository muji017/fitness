const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config();
const trainerModel = require('../models/trainerModel')
const jwt = require('jsonwebtoken')
const utilities = require('../utilities/userUtilities')

// trainer login

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const trainerData = await trainerModel.findOne({ email: email })
        console.log(trainerData)
        if (trainerData) {
            const passmatch = await bcrypt.compare(password, trainerData.password);
            if (passmatch ) {

                
                const token=utilities.tokenGenerator(trainerData._id)

                console.log(trainerData.email);
                res.status(200).json({ trainerId: trainerData._id, trainerToken: token });

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
        const trainerData = await trainerModel.findOne({ email: email })
        if (trainerData) {
            const OTP = utilities.otpGenerator()
            console.log(OTP);
            trainerData.otp = OTP
            await trainerData.save()
            await utilities.sendOtpMail(trainerData.name, trainerData.email, OTP)
            res.status(200).json({ message: "Otp resend success" })
            setTimeout(async () => {
                await trainerModel.updateOne(
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
        const trainerData = await trainerModel.findOne({ email: email })
        console.log(trainerData)
        const OTP = utilities.otpGenerator()
        console.log(OTP);
        trainerData.otp = OTP
        await trainerData.save()
        await utilities.sendOtpMail(trainer.name, trainerData.email, OTP)
        res.status(200).json({ message: "Otp resend success" })
        setTimeout(async () => {
            await trainerModel.updateOne(
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
        const trainerData = await trainerModel.findOne({ email: email })
        console.log("in database", trainerData.otp)
        console.log("in req.body", otp)
        if (trainerData.otp === otp) {
            
            res.status(200).json({ email: trainerData.email });
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

        const trainerData = await trainerModel.findOne({ email: email })
        trainerData.password =await utilities.securePassword(password)
        await trainerData.save()

        const token=utilities.tokenGenerator(trainerData._id)
        console.log(trainerData.email);
        res.status(200).json({ trainerId: trainerData._id, trainerToken: token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports={
    login,
    sendOtp,resendOtp,otpVerify,
    setPassword
}