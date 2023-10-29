const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const usermodel = require('../models/userModel');
const utilities = require('../utilities/userUtilities');
const userModel = require('../models/userModel');
const trainerModel = require('../models/trainerModel');
const paymentDetailModel = require('../models/paymentDetailModel');
const planModel = require('../models/planModel')




// user signup 
const signup = async (req, res) => {
    try {
        console.log("inside");
        console.log(req.body);
        const userData = new usermodel()
        const { name, email, password } = req.body
        const userExist = await usermodel.findOne({ email: email })
        if (userExist) {
            return res.status(409).json({ error: 'Email already exist' })
        }
        userData.name = name;
        userData.email = email
        userData.password = await (utilities.securePassword(password))
        await userData.save()
        console.log("inserted");
        res.status(200).json({ userId: userData._id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// user login

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const userData = await userModel.findOne({ email: email })
        if (userData) {
            const passmatch = await bcrypt.compare(password, userData.password);
            if (passmatch) {
                if (userData.isVerified) {

                    const token = utilities.tokenGenerator(userData._id)
                    console.log(userData.email);
                    res.status(200).json({ userId: userData._id, userToken: token });
                }
                else {
                    const OTP = utilities.otpGenerator()
                    userData.otp = OTP
                    await userData.save()
                    await utilities.sendOtpMail(userData.name, userData.email, OTP)
                    res.status(403).json({ message: "Please valid your email" })
                    setTimeout(async () => {
                        await usermodel.updateOne(
                            { email: email },
                            { $unset: { otp: 1 } }
                        );
                    }, 60000);
                }
            }
            else {
                res.status(401).json({ message: "Email and password don't match" });
            }
        }
        else {
            res.status(402).json({ message: "Email not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// otp matching in login and make user as verified

const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body
        const userData = await userModel.findOne({ email: email })
        console.log("in database", userData.otp)
        console.log("in req.body", otp)
        if (userData.otp === otp) {
            userData.isVerified = true
            await userData.save()
            const token = utilities.tokenGenerator(userData._id)
            // const token="dsx"

            res.status(200).json({ userId: userData._id, userToken: token });
        }
        else {

            res.status(401).json({ message: "Otp mismatch" })
        }
    } catch (error) {

        res.status(500).json({ message: error });
    }
}

// send otp

const sendOtp = async (req, res) => {
    try {
        console.log("inside send otp")
        const { email } = req.body
        const userData = await userModel.findOne({ email: email })
        if (userData) {
            const OTP = utilities.otpGenerator()
            console.log(OTP);
            userData.otp = OTP
            await userData.save()
            await utilities.sendOtpMail(userData.name, userData.email, OTP)
            res.status(200).json({ message: "Otp resend success" })
            setTimeout(async () => {
                await usermodel.updateOne(
                    { email: email },
                    { $unset: { otp: 1 } }
                );
            }, 60000);
        }
        else {
            res.status(402).json({ message: 'Email Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// resend otp 

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body
        console.log(email);
        const userData = await userModel.findOne({ email: email })
        console.log(userData)
        const OTP = utilities.otpGenerator()
        console.log(OTP);
        userData.otp = OTP
        await userData.save()
        await utilities.sendOtpMail(userData.name, userData.email, OTP)
        res.status(200).json({ message: "Otp resend success" })
        setTimeout(async () => {
            await usermodel.updateOne(
                { email: email },
                { $unset: { otp: 1 } }
            );
        }, 60000);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// otp matching in login and make user as verified

const otpVerifyResetPassword = async (req, res) => {
    try {
        const { email, otp } = req.body
        const userData = await userModel.findOne({ email: email })
        if (userData.otp === otp) {
            res.status(200).json({ email: userData.email });
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
        console.log("mail in setPasword", email, password)
        const userData = await userModel.findOne({ email: email })
        userData.password = await utilities.securePassword(password)
        await userData.save()

        const token = utilities.tokenGenerator(userData._id)
        console.log(userData.email);
        res.status(200).json({ userId: userData._id, userToken: token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



// Get trainers list 

const getTrainers = async (req, res) => {
    try {
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
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

// get user profile 

const getProfile = async (req, res) => {
    try {
        const userId = req.userId; // Convert the object to a JSON string
        console.log("UserId as a JSON string:1", typeof userId);
        let userData = await userModel.findOne({ _id: userId })
        let user = userData
        const subscriber = await paymentDetailModel.findOne({ userId: userId }).populate('planId')

        if (subscriber) {
             
            const subscriptionDate = subscriber.subscriptionDate;
            const sday = subscriptionDate.getDate();
            const smonth = subscriptionDate.getMonth() + 1;
            const syear = subscriptionDate.getFullYear();
            const formattedSubscriptionDate = `${sday}/${smonth}/${syear}`;

            const durationInMonths = subscriber.planId.duration;
            const expiryDate = new Date(subscriptionDate);
            expiryDate.setMonth(expiryDate.getMonth() + durationInMonths);

            const day = expiryDate.getDate();
            const month = expiryDate.getMonth() + 1;
            const year = expiryDate.getFullYear();
            const formattedExpiryDate = `${day}/${month}/${year}`;

            userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                isVerified: user.isVerified,
                isBlocked: user.isBlocked,
                planName:subscriber.planId.title,
                image: user.image,
                subscriptionDate: formattedSubscriptionDate,
                expiryDate: formattedExpiryDate
            }
            console.log(userData);
        }

        return res.status(200).json({ user: userData })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

const uploadPic = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findOne({ _id: userId })
        console.log(userData)
        userData.image = req.file.filename
        await userData.save()
        //    const user=userData.map((u)=>({
        //       id :u._id,
        //       name:u.name,
        //       email:u.email,
        //       subscriptionDate:u?.subscriptionDate,
        //       expiryDate:u?.expiryDate
        //    }))
        res.status(200).json({ user: userData })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

// change image
const changeName = async (req, res) => {
    try {
        const userId = req.userId
        const name = req.body.name
        const updatedUserData = await userModel.findByIdAndUpdate(userId, { name: name }, { new: true });
        if (updatedUserData) {
            res.status(200).json({ message: "name changed successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// change password

const changePassword = async (req, res) => {
    try {
        const userId = req.userId
        const password = req.body.password

        const userData = await userModel.findOne({ _id: userId })
        userData.password = await utilities.securePassword(password)
        await userData.save()
        res.status(200).json({ message: "success" })


    } catch (error) {
        res.status(500).json({ message: error })
    }
}


module.exports = {
    signup,
    login,
    otpVerify,
    resendOtp,
    sendOtp,
    otpVerifyResetPassword, setPassword, changePassword,
    getTrainers,
    getProfile, uploadPic, changeName
}

