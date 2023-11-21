const express=require('express');
const trainerroute=express();
const trainercontroller=require('../controllers/trainetrController');
const dierPlanController=require('../controllers/dietPlanController')
const videoController=require('../controllers/videoContoller')
const chatController=require('../controllers/chatController')

const bodyparser=require('body-parser');
trainerroute.use(bodyparser.json());
trainerroute.use(bodyparser.urlencoded({extended:true}));


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
// auth and login ,otp password reset
trainerroute.post('/login',trainercontroller.login)
trainerroute.post('/verifyOtp',trainercontroller.otpVerify);
trainerroute.put('/resendOtp',trainercontroller.resendOtp)
trainerroute.post('/sendOtp',trainercontroller.sendOtp)
trainerroute.put('/setPassword',trainercontroller.setPassword)

// diet plan manament
trainerroute.post('/addDietPlan',checkAuth,upload.single('image'),dierPlanController.addDietPlan)
trainerroute.get('/getDietPlans',checkAuth,dierPlanController.getDietPlans)
trainerroute.put('/updateDietPlan',checkAuth,upload.single('image'),dierPlanController.updateDietPlan)
trainerroute.delete('/deleteDietPlan',checkAuth,dierPlanController.deleteDietPlan)

// profile managment
trainerroute.get('/getTrainerProfile',checkAuth,trainercontroller.getTrainerProfile)
trainerroute.patch('/uploadPic',checkAuth,upload.single('image'),trainercontroller.uploadPic)
trainerroute.patch('/changePassword',checkAuth,upload.none(),trainercontroller.changePassword)
trainerroute.patch('/updateProfile',checkAuth,upload.none(),trainercontroller.updateProfile)

// video managment
trainerroute.get('/getAllVideos',checkAuth,videoController.getAllVideos)
trainerroute.post('/addVideo',checkAuth,upload.single('video'),videoController.addVideo)
trainerroute.delete('/deleteVideo',checkAuth,videoController.deleteVideo)
trainerroute.put('/updateVideo',checkAuth,upload.single('video'),videoController.updateVideo)

// chat side
// userroute.get('/getRoomUser',checkAuth,chatController.getRoomUser)
trainerroute.get('/getChatRooms',checkAuth,chatController.getChatRooms)
trainerroute.post('/sendMessage',checkAuth,chatController.sendMessage)
trainerroute.get('/getAllChats',checkAuth,chatController.getAllChats)
trainerroute.patch('/makeOnlineTrainer',checkAuth,chatController.onlineStatus)
trainerroute.patch('/messageRead',checkAuth,chatController.messageRead)

module.exports=trainerroute