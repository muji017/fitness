
const dietPlanModel = require('../models/dietPlanModel')


const addDietPlan = async (req, res) => {
    try {
        const trainerId = req.body.trainerId
        const title = req.body.title

        const planExists = await dietPlanModel.findOne({ title: title })
        if (planExists) {
            return res.status(409).json({ message: 'title already exist' })
        }
        const planData = new dietPlanModel()
        planData.title = title
        planData.description = req.body.description
        planData.trainerId = trainerId
        planData.uploadDate = new Date()
        planData.image = req.file.filename,
            planData.foodType = req.body.foodType
        planData.isApproved = true
        await planData.save()
        return res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getDietPlans = async (req, res) => {
    try {
        const trainerId = req.query.trainerId
        const DietPlans = await dietPlanModel.find({ trainerId: trainerId })
        return res.status(200).json({ DietPlans: DietPlans })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const updateDietPlan = async (req, res) => {
    try {
        const planId = req.body.planId
        console.log(planId);
        const updates = {
            title: req.body.title,
            image: req.file.filename,
            foodType: req.body.foodType,
            description: req.body.description,
            isVerified: true
        }
        const dietPlan = await dietPlanModel.findOneAndUpdate(
            { _id: planId },
            updates,
            { new: true })

        return res.status(200).json({ message: "Success" })

    } catch (error) {
        res.status(500).json({ error: error })
    }

}

const deleteDietPlan = async (req, res) => {
      try {
        
        const planId=req.query.planId
        console.log(planId);
        await dietPlanModel.deleteOne({_id:planId})
        return res.status(200).json({ message: "Success" })
      } catch (error) {
        res.status(500).json({ error: error })
      }
}
module.exports = {
    addDietPlan,
    getDietPlans,
    updateDietPlan,deleteDietPlan
}