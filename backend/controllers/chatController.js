const ChatRoom = require("../models/chatRoom");
const chatMessage = require("../models/chatMessage");
const trainerModel = require("../models/trainerModel");
const userModel = require("../models/userModel");

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
            chat = new chatMessage()
            chat.room = roomId
            chat.sender = authUserId
            chat.senderType = 'User'
            chat.content = message
            await chat.save()
            res.status(200).json({ chat })
        } else if (authTrainerId) {
            chat = new chatMessage()
            chat.room = roomId
            chat.sender = authTrainerId
            chat.senderType = 'Trainer'
            chat.content = message
            await chat.save()
            res.status(200).json({ chat })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getAllChats = async (req, res) => {
    try {
        const roomId = req.query.roomId
        const chats = await chatMessage.find({ room: roomId }).sort({ createdAt: -1 })
        res.status(200).json({ chats })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const onlineStatus = async (req, res) => {
    try {
        const trainerId = req.body.trainerId
        const status = req.body.status
        if (trainerId) {
            await trainerModel.findByIdAndUpdate(trainerId, { $set: { is_Online: status } });
            res.status(200).json({ message: "succsess" })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const makeOnlineUser = async (req, res) => {
    try {
        const userId = req.body.userId
        const status = req.body.status
        await userModel.findByIdAndUpdate(userId, { $set: { is_Online: status } })
        res.status(200).json({ message: "succsess" })

    } catch (error) {
        res.status(500).json({ error: error })

    }
}

const messageRead = async (req, res) => {
    try {
        const userId = req.userId
        const trainerId = req.trainerId
        if (userId) {
            const roomId = req.body.roomId
            const findMsg = await chatMessage.find({ room: roomId })
            const msgs = await chatMessage.updateMany({ room: roomId, senderType: 'Trainer' }, { $set: { is_read: true } })
            console.log("hdhd", findMsg);
            console.log("hddhdhdhhdhdhdhdhd", msgs);
            res.status(200).json({ message: 'success' })
        }
        if (trainerId) {
            const roomId = req.body.roomId
            const findMsg = await chatMessage.find({ room: roomId })
            const msgs = await chatMessage.updateMany({ room: roomId, senderType: 'User' }, { $set: { is_read: true } })
            console.log("hdhd", findMsg);
            console.log("hddhdhdhhdhdhdhdhd", msgs);
            res.status(200).json({ message: 'success' })

        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    getRoomUser,
    getChatRooms,
    sendMessage,
    getAllChats,
    onlineStatus,
    makeOnlineUser,
    messageRead
}
