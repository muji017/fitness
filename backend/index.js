const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http=require('http')
const io=require('socket.io')(http)

const app = express();
const path = require('path');
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public'));

const userroute = require('./routes/userRoute');
const adminroute = require('./routes/adminRoute');
const trainerroute = require('./routes/trainetRoute');

app.use('/', userroute);
app.use('/admin', adminroute);
app.use('/trainer', trainerroute);



mongoose.connect('mongodb+srv://mujeebrahmanps01707:ruzo4mjVv0WDCyor@cluster0.tpfodys.mongodb.net/fitness?retryWrites=true&w=majority')
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log("Server connected on port 3000");
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });


