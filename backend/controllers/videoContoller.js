const videoModel = require("../models/videoModel")
const watchHistory=require("../models/watchedVideo")

const getAllVideos = async (req, res) => {
    try {
        const trainerId = req.query.trainerId
        let videos = await videoModel.find({})
        if (trainerId) {
            videos = await videoModel.find({ trainerId: trainerId })
        }
        return res.status(200).json({ VideoModel: videos })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const addVideo = async (req, res) => {
    try {
        const trainerId = req.trainerId
        const title = req.body.title
        const planExists = await videoModel.findOne({ title: title })
        if (planExists) {
            return res.status(409).json({ message: 'title already exist' })
        }
        const planData = new videoModel()
        planData.title = title
        planData.description = req.body.description
        planData.trainerId = trainerId
        planData.uploadDate = new Date()
        planData.video = req.file.filename,
            planData.workoutType = req.body.workoutType,
            planData.bodyPart = req.body.bodyPart,
            planData.isApproved = true,
            planData.isLive = false,
            await planData.save()
        return res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
const deleteVideo = async (req, res) => {
    try {

        const videoId = req.query.videoId
        await videoModel.deleteOne({ _id: videoId })
        return res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const updateVideo = async (req, res) => {
    try {
        const videoId = req.body.videoId
        let video
        if (req.file) {
            video = req.file.filename
        }
        else {
            const existingVideo = await videoModel.findOne({ _id: videoId })
            video = existingVideo.video
        }
        const updates = {
            title: req.body.title,
            video: video,
            workoutType: req.body.workoutType,
            bodyPart: req.body.bodyPart,
            description: req.body.description,
            isVerified: true
        }
        const updatedVideo = await videoModel.findOneAndUpdate(
            { _id: videoId },
            updates,
            { new: true })

        return res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
const changeVideoStatus = async (req, res) => {
    try {
        const { videoId } = req.body
        const videoData = await videoModel.findOne({ _id: videoId })
        if (videoData) {
            videoData.isApproved = !videoData.isApproved
            await videoData.save()
            await getAllVideos(req, res);
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
const changeVideoPremium = async (req, res) => {
    try {
        const { videoId } = req.body
        const videoData = await videoModel.findOne({ _id: videoId })
        if (videoData) {
            videoData.isPremium = !videoData.isPremium
            await videoData.save()
            await getAllVideos(req, res);
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getWatchHistory = async (req, res) => {
    try {
        const userId=req.userId
        const watchhistory=await watchHistory.findOne({userId:userId})
        res.status(200).json({watchhistory})
    } catch (error) {
        res.status(500).json({ error: error })  
    }
}
const addWatchHistory = async (req,res)=>{
    try {
       const userId=req.userId
       const videoId=req.body.videoId
       await watchHistory.updateOne({userId:userId},{$addToSet:{videoId:videoId}},{upsert:true}) 
       res.status(200).json({message:"success"})
    } catch (error) {
        res.status(500).json({ error: error })  
    }
}
module.exports = {
    getAllVideos,
    addVideo,
    deleteVideo,
    updateVideo,
    changeVideoStatus,
    changeVideoPremium,
    getWatchHistory,
    addWatchHistory
}