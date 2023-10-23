const dotenv=require('dotenv');
const userModel = require('../models/userModel');
const jwtDecode = require('jwt-decode');
const trainerModel = require('../models/trainerModel');

const checkAuth= async(req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
          return res.status(401).json({ error: 'Authorization header is missing' });
        }
        const tokenParts = authHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
          return res.status(401).json({ error: 'Invalid Authorization header format' });
        }
      
        const token = tokenParts[1];
        const payload=await jwtDecode(token)
        const payloadJson=JSON.stringify(payload)
        const userId=payload.userId
        const user=await userModel.findOne({_id:userId})
        if(user&&!user.isBlocked){
          req.userId=userId
          next()
        }
        const trainer=await trainerModel.findOne({_id:userId})
        if(trainer&&trainer.isVerified){
          req.trainerId=userId
          next()
        }
       
    } catch (error) {
        
    }
}

module.exports={
    checkAuth
}