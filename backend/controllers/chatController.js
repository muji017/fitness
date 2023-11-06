const ChatRoom = require("../models/chatRoom");
const chatMessage = require("../models/chatMessage");

const getRoomUser = async (req, res) => {
    try {
        const authUserId = req.userId
        const authTrainerId = req.trainerId
        if (authUserId) {
            const trainerId = req.query.trainerId;
            let chatRoom = await ChatRoom.findOne({ userId: authUserId, trainerId: trainerId })

            if (!chatRoom) {
                chatRoom = new ChatRoom()
                chatRoom.userId = authUserId
                chatRoom.trainerId = trainerId
                await chatRoom.save()
            }

            const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id })
            res.status(200).json({ roomDetails })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getChatRooms = async (req, res) => {
    try {
        const authUserId = req.userId
        const authTrainerId = req.trainerId
        if (authUserId) {
            let chatRooms = await ChatRoom.find({ userId: authUserId })
            res.status(200).json({ chatRooms: chatRooms })
        }
        else if (authTrainerId) {
            let chatRooms = await ChatRoom.find({ trainerId: authTrainerId }).populate('userId')
            res.status(200).json({ chatRooms: chatRooms })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const sendMessage = async (req, res) => {
    try {
        const { roomId, message } = req.body
        const authUserId = req.userId
        const authTrainerId = req.trainerId
        if (authUserId) {
           chat=new chatMessage()
           chat.room=roomId
           chat.sender=authUserId
           chat.senderType='User'
           chat.content=message
           await chat.save()
           res.status(200).json({message:'Message sended'})
       } else if(authTrainerId) {
        chat=new chatMessage()
        chat.room=roomId
        chat.sender=authTrainerId
        chat.senderType='Trainer'
        chat.content=message
        await chat.save()
        res.status(200).json({message:'Message sended'})
    }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getAllChats= async( req,res)=>{
    try {
        const roomId=req.query.roomId
        const chats= await chatMessage.find({room:roomId}).sort({createdAt:-1})
        res.status(200).json({chats})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    getRoomUser,
    getChatRooms,
    sendMessage,
    getAllChats
}
