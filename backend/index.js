const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()
const path=require('path')

// Enable CORS middleware
app.use(cors({
    origin: 'http://localhost:4200',
}));


// connecting mongodb Atlas
mongoose.connect('mongodb+srv://mujeebrahmanps01707:ruzo4mjVv0WDCyor@cluster0.tpfodys.mongodb.net/fitness?retryWrites=true&w=majority')
.then(()=>{
   console.log('dbconnected');
})

const userroute=require('./routes/userRoute');
// const adminroute=require('./routes/adminRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public'));


app.use('/',userroute);
// app.use('/admin',adminroute);



app.listen(3000,()=>{
    console.log("server conected in port 3000");
})