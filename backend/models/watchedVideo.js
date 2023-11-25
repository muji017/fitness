const mongoose=require('mongoose')

const watchedVideo = mongoose.Schema({
    userId: {
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }, 
    videoId:[ {
         type: mongoose.Schema.Types.ObjectId, ref: 'Video'
    }],
})

module.exports=mongoose.model('Watchedvideo',watchedVideo);