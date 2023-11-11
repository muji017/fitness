const express=require('express');
const adminroute=express();
const admincontroller=require('../controllers/adminController');
const subscriptionController=require('../controllers/subscriptionController')
const dietPlanController=require('../controllers/dietPlanController')
const videoController=require('../controllers/videoContoller')


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
// auth and login and otp 
adminroute.post('/login',admincontroller.login)
adminroute.post('/verifyOtp',admincontroller.otpVerify);
adminroute.put('/resendOtp',admincontroller.resendOtp)
adminroute.post('/sendOtp',admincontroller.sendOtp)
adminroute.put('/setPassword',admincontroller.setPassword)
// trainer managment
adminroute.put('/changeTrainerStatus',admincontroller.changeTrainerStatus)
adminroute.get('/getTrainersList',admincontroller.getTrainersList)
adminroute.post('/addTrainer',upload.single('image'),admincontroller.addTrainer)
// user managment
adminroute.get('/getUsersList',admincontroller.getUsersList)
adminroute.put('/changeUserStatus',admincontroller.changeUserStatus)
// subscription managment
adminroute.get('/getPlans',subscriptionController.getPlans)
adminroute.post('/addPlan',upload.none(),subscriptionController.addPlan)
adminroute.put('/updatePlan',upload.none(),subscriptionController.updatePlan)
adminroute.put('/changePlanStatus',subscriptionController.changePlanStatus)
adminroute.get('/subscribers',checkAuth,subscriptionController.getSubscribers)
adminroute.put('/changeSubscribersStatus',checkAuth,subscriptionController.changeSubscribersStatus)
// diet managment
adminroute.put('/changeDietPremium',upload.none(),dietPlanController.changeDietPremium)
adminroute.get('/getDietPlan',dietPlanController.getAllDietPlans)
adminroute.put('/changeDietPlanStatus',checkAuth,dietPlanController.changeDietPlanStatus)

// video managment
adminroute.get('/getVideos',videoController.getAllVideos)
adminroute.put('/changeVideoStatus',videoController.changeVideoStatus)
adminroute.put('/changeVideoPremium',videoController.changeVideoPremium)

module.exports=adminroute