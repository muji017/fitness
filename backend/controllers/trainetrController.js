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
                res.status(401).json({ error: "Email and password don't match" });
            }
        }
        else {
            res.status(402).json({ error: "Email not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
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
            res.status(402).json({ message: 'Email Not Found' })
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

// get profile

const getTrainerProfile=async(req,res)=>{
    try {
        const trainerId=req.trainerId
        const trainer=await trainerModel.findOne({_id:trainerId})
        res.status(200).json({ trainer });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const uploadPic = async (req, res) => {
    try {
        const trainerId = req.trainerId;
        const trainerData = await trainerModel.findOne({ _id: trainerId })
        console.log(trainerData)
        trainerData.image = req.file.filename
        await trainerData.save()
        res.status(200).json({ message:"success" })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}


// change password

const changePassword = async (req, res) => {
    try {
        const trainerId = req.trainerId
        const password = req.body.password

        const trainerData = await trainerModel.findOne({ _id: trainerId })
        trainerData.password = await utilities.securePassword(password)
        await trainerData.save()
        res.status(200).json({ message: "success" })


    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const updateProfile=async(req,res)=>{
    try {
        const trainerId = req.trainerId
        console.log(trainerId);
        const updates = {
            name: req.body.name,
            qualification: req.body.qualification,
            location: req.body.location,
            description: req.body.description,
            jobPosition:req.body.jobPosition
        }
        const trainerData = await trainerModel.findOneAndUpdate(
            { _id: trainerId },
            updates,
            { new: true })

        return res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


module.exports={
    login,
    sendOtp,resendOtp,otpVerify,
    setPassword,getTrainerProfile,uploadPic,
    changePassword,updateProfile
}