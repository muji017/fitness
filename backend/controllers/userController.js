const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const usermodel = require('../models/userModel');
const utilities = require('../utilities/userUtilities');
const userModel = require('../models/userModel');
const trainerModel = require('../models/trainerModel');




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
                    const options = {
                        expiresIn: '1h'
                    };
                    const token = jwt.sign({userId: userData._id }, process.env.JWTSECRET, options);
                    //   const tokencookie = jwt.sign(req.body,'mysecretkey')
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })

                    console.log(userData.email);
                    res.status(200).json({ userId: userData._id, userToken: token });
                }
                else {
                    const OTP = utilities.otpGenerator()
                    userData.otp = OTP
                    await userData.save()
                    await utilities.sendOtpMail(userData.name,userData.email,OTP)
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
            res.status(404).json({ message: "Email not found" })
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error" });
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
            const options = {
                expiresIn: '1h'
            };
            const token = jwt.sign({userId: userData._id }, 'mysecretkey', options);
            console.log(userData.email);
            res.status(200).json({ userId: userData._id, userToken: token });
        }
        else {

            res.status(401).json({ message: "Otp mismatch" })
        }
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error" });
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
        await utilities.sendOtpMail(userData.name,userData.email,OTP)
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
            res.status(404).json({ message: 'Email Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// Get trainers list 

const getTrainers=async(req,res)=>{
    try{
    const trainers=await trainerModel.find({})
       const trainerlist=trainers.map((t)=>({
          id :t._id,
          name:t.name,
          qualification:t.qualification,
          level:t.level,
          image:t.image,
          location:t.location??"Kerala , Indian",
          jobPosition:t.jobPosition??"Fitness Trainer"
       }))
     res.status(200).json({trainers:trainerlist})
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

module.exports = {
    signup,
    login,
    otpVerify,
    resendOtp,
    sendOtp,
    getTrainers
}

