const mongoose = require('mongoose')

const trainer = mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    otp: {
        type: String
    },
    specification:{
        type: String
    },
    jobPosition:{
        type: String
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    qualification: {
        type: String,
        
    },
    location:{
        type:String
    },
    description:{
        type:String
    },
    is_Online:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model('Trainer', trainer);