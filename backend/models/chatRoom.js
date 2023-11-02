import mongoose from 'mongoose'

const chatRoom = mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }, 
    trainer: {
         type: mongoose.Schema.Types.ObjectId, ref: 'Trainer'
    },
    messages:{
     type:String
    },
})

const ChatRoom = mongoose.model('chatRoom',chatRoom);

export default ChatRoom ;