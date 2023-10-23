
const mongoose=require('mongoose')

const subscriptionplan=mongoose.Schema({
   
    title:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean
    }
    
})

module.exports=mongoose.model('Subscriptionplan',subscriptionplan);