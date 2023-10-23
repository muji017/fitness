const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config();
const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const utilities = require('../utilities/userUtilities');
const trainerModel = require('../models/trainerModel');
const userModel = require('../models/userModel')
const planModel = require('../models/planModel');
const paymentDetailModel = require('../models/paymentDetailModel');

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
                const token = utilities.tokenGenerator(adminData._id)

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
        console.log("mail in verify otp admin", email)
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
        console.log(email, password);
        const adminData = await adminModel.findOne({ email: email })
        const securePassword = await utilities.securePassword(password)
        console.log(securePassword);
        adminData.password = securePassword
        await adminData.save()

        const token = utilities.tokenGenerator(adminData._id)
        console.log(adminData.email);
        res.status(200).json({ adminId: adminData._id, adminToken: token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// change trainer status

const changeTrainerStatus = async (req, res) => {
    try {
        const { trainerId } = req.body
        const trainer = await trainerModel.findOne({ _id: trainerId })
        if (trainer) {
            trainer.isVerified = !trainer.isVerified
            await trainer.save()
        }
        const trainers = await trainerModel.find({})
        const trainerlist = trainers.map((t) => ({
            id: t._id,
            name: t.name,
            email: t.email,
            qualification: t.qualification,
            specification: t.specification,
            image: t.image,
            location: t.location,
            jobPosition: t.jobPosition,
            description: t.description,
            isVerified: t.isVerified
        }))
        res.status(200).json({ trainers: trainerlist })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

// add Trainer

const addTrainer = async (req, res) => {
    try {

        console.log(req.body)
        console.log("image", req.file.filename);
        const trainerExist = await trainerModel.findOne({ email: req.body.email })
        if (trainerExist) {
            return res.status(409).json({ error: 'Email already exist' })
        }
        const trainerData = new trainerModel()
        trainerData.name = req.body.name;
        trainerData.email = req.body.email;
        trainerData.qualification = req.body.qualification,
            trainerData.specification = req.body.specification,
            trainerData.image = req.file.filename,
            trainerData.location = req.body.location,
            trainerData.jobPosition = req.body.jobPosition,
            trainerData.description = req.body.description,
            trainerData.isVerified = true

        trainerData.password = await (utilities.securePassword(req.body.password))
        await trainerData.save()
        return res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

// list users list

const getUsersList = async (req, res) => {
    try {
        const users = await userModel.find({})
        const userList = users.map((t) => ({
            id: t._id,
            name: t.name,
            email: t.email,
            image: t.image,
            isVerified: t.isVerified,
            isBlocked:t.isBlocked
        }))
        return res.status(200).json({ users: userList })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

// change user status

const changeUserStatus = async (req, res) => {
    try {

        const { userId } = req.body
        const user = await userModel.findOne({ _id: userId })
        console.log(user)
        if (user) {
            user.isBlocked = !user.isBlocked
            await user.save()
            await getUsersList(req, res);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}



module.exports = {
    login,
    sendOtp,
    resendOtp,
    otpVerify,
    setPassword,
    changeTrainerStatus,
    addTrainer,
    getUsersList,
    changeUserStatus
}