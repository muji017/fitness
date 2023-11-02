import asyncHandler from "express-async-handler";
import ChatRoom from "../models/chatRoom.js";
import ChatMessage from "../models/chatMessage.js";

const chatController = {
    createRoom : asyncHandler(async(req,res)=>{
        try {
            const { user, trainer } = req.params

            let chatRoom = await ChatRoom.findOne({
                user:user,
                trainer:trainer
            })
    
            if(!chatRoom){
                chatRoom = new ChatRoom({
                    user:user,
                    trainer:trainer,
                    messages:[]
                })
                await chatRoom.save();
            }

            const roomDetails = await ChatRoom.findOne({_id:chatRoom._id}).populate({path:'doctor',select:'_id name specialization'})
            
            res.status(200).json(roomDetails);
        } catch (error) {
            res.status(500).json({ message: 'Error creating or getting chat room' });
        }
    }),

    chatSend: asyncHandler(async (req, res) => {
        const { content } = req.body;
        const { chatid, sender, type } = req.params;
      
        // Create a new chat message
        const newMessage = new ChatMessage({
          room: chatid,
          sender: sender,
          senderType: type,
          content: content,
        });
      
        // Save the chat message
        await newMessage.save();

        let chatRoom = await ChatRoom.findOne({_id:chatid})
        if(chatRoom){
            chatRoom.messages.push(newMessage._id)
        }
        await chatRoom.save()
      
        // Populate the sender field with specific fields (_id, name, email)
        // and also populate the nested fields room.user and room.doctor
        await newMessage.populate([
          { path: 'sender', select: '_id name email' },
          { path: 'room', populate: [{ path: 'user', select: '_id name email' }, { path: 'doctor', select: '_id name email' }] },
        ]);
      
        // Return the chat message with all populated fields
        res.json(newMessage);
    }),

    //User side
    getRooms : asyncHandler(async(req,res)=>{
        const { user } = req.params
        const rooms = await ChatRoom.find({user:user}).populate({path:'doctor',select:'_id name email specialization'})
        if(rooms){
            res.status(200).json(rooms)
        }else{
            res.status(400).json({message:"Failed to fetch rooms"})
        }
    }),

    //Doctors side
    getDoctorsRooms : asyncHandler(async(req,res)=>{
        const { doctor } = req.params
        const rooms = await ChatRoom.find({doctor:doctor}).populate({path:'user',select:'_id name email'})
        if(rooms){
            res.status(200).json(rooms)
        }else{
            res.status(400).json({message:"Failed to fetch rooms"})
        }
    }),

    getMessages: asyncHandler(async (req, res) => {
        const { roomid } = req.params;
      
        try {
          // Sort messages in ascending order of createdAt
          const messages = await ChatMessage.find({ room: roomid }).sort({ createdAt: 1 });
      
          if (messages) {
            res.status(200).json(messages);
          } else {
            res.status(404).json({ message: 'No messages found for the given room.' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
    })
      
}

export default chatController;