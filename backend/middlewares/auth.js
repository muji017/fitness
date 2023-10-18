const dotenv=require('dotenv');
const userModel = require('../models/userModel');
const jwtDecode = require('jwt-decode');

const checkAuth= async(req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];
         console.log(authHeader);
        if (!authHeader) {
          return res.status(401).json({ error: 'Authorization header is missing' });
        }
      
        const tokenParts = authHeader.split(" ");
        console.log("token parts ",tokenParts)
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
          return res.status(401).json({ error: 'Invalid Authorization header format' });
        }
      
        const token = tokenParts[1];
        console.log(token);
        const payload=await jwtDecode(token)
        const payloadJson=JSON.stringify(payload)
        console.log("d",payload)
        const userId=payload.userId
        console.log(typeof userId)
        const user=await userModel.findOne({_id:userId})
        console.log(user)
        if(user){
          req.userId=userId
          next()
        }
       
    } catch (error) {
        
    }
}

module.exports={
    checkAuth
}