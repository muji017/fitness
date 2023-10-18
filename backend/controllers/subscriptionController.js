
const dotenv = require('dotenv').config();

const usermodel = require('../models/userModel');
const utilities = require('../utilities/userUtilities');
const userModel = require('../models/userModel');
const trainerModel = require('../models/trainerModel');
const planModel = require('../models/planModel')
const Razorpay = require('razorpay');
const paymentDetailModel = require('../models/paymentDetailModel');

const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({

    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

// creating subscription

const createSubscription = async (req, res) => {
    try {
        console.log("inside creaateSubscription");
        const userDate = await userModel.findOne({ _id: req.userId })
        console.log("user", userDate);
        const plan = await planModel.findOne({ _id: req.body.planId })
        console.log("plan", plan);
        const amount = Math.round(parseFloat(plan.amount) * 100); // Convert the total amount to paise
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: process.env.emailUser,
        };

        razorpayInstance.orders.create(options, async (err, order) => {
            if (!err) {
                res.status(200).json({
                    success: true,
                    msg: 'Subscription Created',
                    payment_id: order.id,
                    amount: amount,
                    key_id: RAZORPAY_ID_KEY,
                    name: userDate.name,
                    email: userDate.email,
                });
            } else {
                res.status(401).json({ error: 'error' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// get plans 
const getPlans = async (req, res) => {
    try {
        const plans = await planModel.find({})
        console.log(plans)
        res.status(200).json({ plans: plans })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// process payment

const processPayment = async (req, res) => {
    try {
        console.log("payment");
        const userId = req.userId
        const {planId,paymentMethod} = req.body
      
        const date = new Date()
        const filter = { userId: userId };
        const update = {
            $set: {
                paymentMethod: paymentMethod,
                planId: planId,
                subscriptionDate: date
            }
        };
        const result = await paymentDetailModel.updateOne(filter, update, { upsert: true });
        res.status(200).json({ message: "success" })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    getPlans,
    createSubscription,
    processPayment
}
