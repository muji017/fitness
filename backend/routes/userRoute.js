const express=require('express');
const userroute=express();
const usercontroller=require('../controllers/userController');
const subscriptionContoller=require('../controllers/subscriptionController')
const dietPlanController=require('../controllers/dietPlanController')

const bodyparser=require('body-parser');
userroute.use(bodyparser.json());
userroute.use(bodyparser.urlencoded({extended:true}));


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


userroute.post('/login',usercontroller.login);

userroute.post('/signup', usercontroller.signup);

userroute.post('/verifyOtp',usercontroller.otpVerify);

userroute.put('/resendOtp',usercontroller.resendOtp)

userroute.post('/sendOtp',usercontroller.sendOtp)

userroute.put('/setPassword',usercontroller.setPassword)

userroute.get('/trainerslist',usercontroller.getTrainers)

userroute.get('/getProfile',checkAuth,usercontroller.getProfile)

userroute.get('/getPlans',checkAuth,subscriptionContoller.getPlans)

userroute.post('/createSubscription',checkAuth,subscriptionContoller.createSubscription)

userroute.post('/processPayment',checkAuth,subscriptionContoller.processPayment)

userroute.put('/uploadPic',upload.single('image'),checkAuth,usercontroller.uploadPic)

userroute.put('/changeName',checkAuth,upload.none(),usercontroller.changeName)

userroute.put('/changePassword',checkAuth,upload.none(),usercontroller.changePassword)

userroute.get('/getDietPlans',checkAuth,dietPlanController.getAllDietPlans)

module.exports=userroute;