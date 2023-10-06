const express=require('express');
const userroute=express();
const usercontroller=require('../controllers/userController');

const bodyparser=require('body-parser');
userroute.use(bodyparser.json());
userroute.use(bodyparser.urlencoded({extended:true}));


const multer= require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,_file,callb){
        callb(null,path.join('./public/images/user'));
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

// userroute.post('/uploadprofpic',upload.single('image'),usercontroller.uploadprofpic)



module.exports=userroute;