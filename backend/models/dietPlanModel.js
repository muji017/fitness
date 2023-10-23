const mongoose=require('mongoose')
const dietPlan=mongoose.Schema({
   
    trainerId:{
        type:mongoose.Types.ObjectId,
        ref:'Trainer',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    foodType:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    isPremium:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('DietPlan',dietPlan);