const mongoose=require('mongoose')
const video=mongoose.Schema({
   
    trainerId:{
        type:mongoose.Types.ObjectId,
        ref:'Trainer',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    workoutType:{
        type:String,
        required:true
    },
    bodyPart:{
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
    },
    isLive:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('Video',video);