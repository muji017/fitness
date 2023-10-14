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
    level:{
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    qualification: {
        type: String,
        
    },
    location:{
        type:String
    },
    
    jobPosition:{
        type:String
    }
    
})

module.exports = mongoose.model('Trainer', trainer);