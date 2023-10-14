const mongoose=require ('mongoose')

const user=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    otp:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    subcriptionDate:{
        type:Date
    },
    subscriptionId:{
        
    },
    paymentMethode:{
        type:String
    },
    
})

module.exports=mongoose.model('User',user);