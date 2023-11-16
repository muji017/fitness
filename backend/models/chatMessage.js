const mongoose=require('mongoose')

const chatMessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    refPath: 'senderType',
  },
  senderType: {
    type: String,
    enum: ['User', 'Trainer'],
    // required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },is_read:{
    type:Boolean,
    default:false
  }
});
module.exports=mongoose.model('Chatmessage',chatMessageSchema);
