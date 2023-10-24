const express=require('express');
const trainerroute=express();
const trainercontroller=require('../controllers/trainetrController');
const dierPlanController=require('../controllers/dietPlanController')



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

trainerroute.post('/login',trainercontroller.login)


trainerroute.post('/verifyOtp',trainercontroller.otpVerify);

trainerroute.put('/resendOtp',trainercontroller.resendOtp)

trainerroute.post('/sendOtp',trainercontroller.sendOtp)

trainerroute.put('/setPassword',trainercontroller.setPassword)

trainerroute.post('/addDietPlan',upload.single('image'),dierPlanController.addDietPlan)

trainerroute.get('/getDietPlans',dierPlanController.getDietPlans)

trainerroute.put('/updateDietPlan',upload.single('image'),dierPlanController.updateDietPlan)

trainerroute.delete('/deleteDietPlan',dierPlanController.deleteDietPlan)

trainerroute.get('/getTrainerProfile',trainercontroller.getTrainerProfile)

trainerroute.put('/uploadPic',upload.single('image'),trainercontroller.uploadPic)


trainerroute.put('/changePassword',upload.none(),trainercontroller.changePassword)

trainerroute.put('/updateProfile',upload.none(),trainercontroller.updateProfile)

module.exports=trainerroute