const mongoose=require('mongoose')

const admin=mongoose.Schema({
   
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
})

module.exports=mongoose.model('Admin',admin);