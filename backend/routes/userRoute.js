const express=require('express');
const userroute=express();
const usercontroller=require('../controllers/userController');
const subscriptionContoller=require('../controllers/subscriptionController')
const dietPlanController=require('../controllers/dietPlanController')
const videoController=require('../controllers/videoContoller')
const chatController=require('../controllers/chatController')

const bodyparser=require('body-parser');
userroute.use(bodyparser.json());
userroute.use(bodyparser.urlencoded({extended:true}));


const multer= require('multer');
const path=require('path');
const { checkAuth } = require('../middlewares/auth');
// multer
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

// auth login ,otp resetpassword
userroute.post('/login',usercontroller.login);
userroute.post('/signup', usercontroller.signup);
userroute.post('/verifyOtp',usercontroller.otpVerify);
userroute.put('/resendOtp',usercontroller.resendOtp)
userroute.post('/sendOtp',usercontroller.sendOtp)
userroute.put('/setPassword',usercontroller.setPassword)
userroute.get('/trainerslist',checkAuth,usercontroller.getTrainers)

// profile and subscription plans
userroute.get('/getProfile',checkAuth,usercontroller.getProfile)
userroute.get('/getPlans',checkAuth,subscriptionContoller.getPlans)
userroute.post('/createSubscription',checkAuth,subscriptionContoller.createSubscription)
userroute.post('/processPayment',checkAuth,subscriptionContoller.processPayment)
userroute.put('/uploadPic',upload.single('image'),checkAuth,usercontroller.uploadPic)
userroute.put('/changeName',checkAuth,upload.none(),usercontroller.changeName)
userroute.put('/changePassword',checkAuth,upload.none(),usercontroller.changePassword)

// videos and diet plans
userroute.get('/getDietPlans',checkAuth,dietPlanController.getAllDietPlans)
userroute.get('/getVideos',checkAuth,videoController.getAllVideos)

// chat side
userroute.get('/getRoomUser',checkAuth,chatController.getRoomUser)
userroute.get('/getChatRooms',checkAuth,chatController.getChatRooms)
userroute.post('/sendMessage',checkAuth,chatController.sendMessage)
userroute.get('/getAllChats',checkAuth,chatController.getAllChats)
userroute.patch('/makeOnlineUser',checkAuth,chatController.makeOnlineUser)
userroute.patch('/messageRead',checkAuth,chatController.messageRead)

module.exports=userroute; 