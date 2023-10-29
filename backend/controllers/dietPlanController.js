
const dietPlanModel = require('../models/dietPlanModel')


const addDietPlan = async (req, res) => {
    try {
        const trainerId = req.trainerId
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
        const trainerId = req.trainerId
     console.log(trainerId);
        const DietPlans = await dietPlanModel.find({ trainerId: trainerId })
        return res.status(200).json({ DietPlans: DietPlans })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getAllDietPlans = async (req, res) => {
    try {
        const DietPlans = await dietPlanModel.find({ })
        return res.status(200).json({ DietPlans: DietPlans })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const updateDietPlan = async (req, res) => {
    try {
        const planId = req.body.planId
        let image
        if(req.file){
            image=req.file.filename
        }
        else{
            const existplan=await dietPlanModel.findOne({_id:planId})
            image=existplan.image
        }
        const updates = {
            title: req.body.title,
            image: image,
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
        await dietPlanModel.deleteOne({_id:planId})
        return res.status(200).json({ message: "Success" })
      } catch (error) {
        res.status(500).json({ error: error })
      }
}

const changeDietPremium=async(req,res)=>{
    try {
        
        const { planId } = req.body
        const planData = await dietPlanModel.findOne({ _id: planId })
        if (planData) {
            planData.isPremium = !planData.isPremium
            await planData.save()
            await getAllDietPlans(req, res);
        }
    } catch (error) {
        res.status(500).json({ error: error })  
    }
}
module.exports = {
    addDietPlan,
    getDietPlans,
    updateDietPlan,deleteDietPlan,
    changeDietPremium,getAllDietPlans
}