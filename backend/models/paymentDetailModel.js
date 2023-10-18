const mongoose=require('mongoose')

const paymentdetail=mongoose.Schema({
   
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    planId:{
        type:mongoose.Types.ObjectId,
        ref:'Subscriptionplan',
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    subscriptionDate:{
        type:Date,
        required:true
    }
})

module.exports=mongoose.model('Paymentdetail',paymentdetail);