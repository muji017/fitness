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
    isVerified: {
        type: Boolean,
        default: false
    },
    Qualification: {
        type: String,
        
    }
})

module.exports = mongoose.model('Trainer', trainer);