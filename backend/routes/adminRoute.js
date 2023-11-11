const express=require('express');
const adminroute=express();
const admincontroller=require('../controllers/adminController');
const subscriptionController=require('../controllers/subscriptionController')
const dietPlanController=require('../controllers/dietPlanController')



const bodyparser=require('body-parser');
adminroute.use(bodyparser.json());
adminroute.use(bodyparser.urlencoded({extended:true}));


const multer= require('multer');
const path=require('path');
const { checkAuth } = require('../middlewares/auth');

const storage=multer.diskStorage({
    destination:function(req,_file,callb){
        callb(null,path.join('./public/images'));
    },
    imagename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});
const upload =multer({storage:storage});

adminroute.post('/login',admincontroller.login)

adminroute.post('/verifyOtp',admincontroller.otpVerify);

adminroute.put('/resendOtp',admincontroller.resendOtp)

adminroute.post('/sendOtp',admincontroller.sendOtp)

adminroute.put('/setPassword',admincontroller.setPassword)

adminroute.put('/changeTrainerStatus',admincontroller.changeTrainerStatus)

adminroute.get('/getTrainersList',admincontroller.getTrainersList)

adminroute.post('/addTrainer',upload.single('image'),admincontroller.addTrainer)

adminroute.get('/getUsersList',admincontroller.getUsersList)

adminroute.put('/changeUserStatus',admincontroller.changeUserStatus)

adminroute.get('/getPlans',subscriptionController.getPlans)

adminroute.post('/addPlan',upload.none(),subscriptionController.addPlan)

adminroute.put('/updatePlan',upload.none(),subscriptionController.updatePlan)

adminroute.put('/changePlanStatus',subscriptionController.changePlanStatus)

adminroute.put('/changeDietPremium',upload.none(),dietPlanController.changeDietPremium)

adminroute.get('/getDietPlan',dietPlanController.getAllDietPlans)

adminroute.get('/subscribers',checkAuth,subscriptionController.getSubscribers)

adminroute.put('/changeSubscribersStatus',checkAuth,subscriptionController.changeSubscribersStatus)

adminroute.put('/changeDietPlanStatus',checkAuth,dietPlanController.changeDietPlanStatus)

module.exports=adminroute