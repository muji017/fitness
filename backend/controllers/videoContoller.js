const videoModel = require("../models/videoModel")

const getAllVideos = async (req, res) => {
    try {
        const trainerId=req.query.trainerId
        let videos = await videoModel.find({ })
        if(trainerId){
          videos=await videoModel.find({trainerId:trainerId})
        }
        return res.status(200).json({VideoModel:videos})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const addVideo = async (req, res) => {
    try {
        const trainerId = req.body.trainerId
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
        planData.bodyPart=req.body.bodyPart,
        planData.isApproved = true,
        planData.isLive=false,
        await planData.save()
        return res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports={
    getAllVideos,
    addVideo
}