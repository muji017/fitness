const express=require('express');
const trainerroute=express();
const trainercontroller=require('../controllers/trainetrController');



const bodyparser=require('body-parser');
trainerroute.use(bodyparser.json());
trainerroute.use(bodyparser.urlencoded({extended:true}));


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

trainerroute.post('/login',trainercontroller.login)


module.exports=trainerroute