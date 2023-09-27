const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const usermodel=require('../models/userModel');
const userModel = require('../models/userModel');

// password hashing
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
};

// user signup 
const signup=async (req,res)=>{
    try {
        console.log("inside");
        console.log(req.body);
       const userData=new usermodel()
       const {name,email, password } = req.body
       const userExist=await usermodel.findOne({email:email})
       if(userExist){
        return res.status(409).json({errorMsg:'Email already exist'})
       }
       userData.name=name;
       userData.email=email
       userData.password=await(securePassword(password))
       await userData.save()
       console.log("inserted");
       res.status(200).json({ userId: userData._id });
        
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
}

// user login

const login=async(req,res)=>{
    try {
      const { email, password } = req.body
      console.log(email,password)
      const userData = await usermodel.findOne({ email: email })
        if (userData) {
            const passmatch = await bcrypt.compare(password, userData.password);
            if (passmatch) {
                if(userData.isVerified){
                    const options = {
                        expiresIn: '1h'
                      };
                      const token = jwt.sign(req.body, 'mysecretkey', options);
                      console.log(userData.email);
                    res.status(200).json({ userId: userData._id ,userToken:token});
                }
                else{
                    var digits = '0123456789';
                    let OTP = '';
                    for (let i = 0; i < 6; i++) {
                        OTP += digits[Math.floor(Math.random() * 10)];
                    }
                    await userModel.updateOne(
                        { email: email },
                        { $set: { otp: OTP } }
                    );
                    res.status(403).json({valid:userData.isVerified})
                    setTimeout(async () => {
                        await usermodel.updateOne(
                            { email: email },
                            { $unset:{otp:1 }}
                        );
                    }, 60000);
                }
            } 
            else {
              res.status(401).json({ passError: "Email and password don't match" });
            }
          } 
          else
           {
            res.status(404).json({ emailError: "Email not found" }) 
          }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
}

// otp matching in login and make user as verified

const otpVerify = async (req,res)=>{
    try {
        
       

    } catch (error) {
        
      res.status(500).json({ error: 'An error occurred' });
    }
} 


module.exports={
    signup,
    login
}

