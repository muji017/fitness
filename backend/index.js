const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

const userroute = require('./routes/userRoute');
const adminroute = require('./routes/adminRoute');
const trainerroute = require('./routes/trainetRoute');

app.use('/', userroute);
app.use('/admin', adminroute);
app.use('/trainer', trainerroute);

mongoose.connect('mongodb://mujeebrahmanps01707:ruzo4mjVv0WDCyor@ac-z6r2eyk-shard-00-00.tpfodys.mongodb.net:27017,ac-z6r2eyk-shard-00-01.tpfodys.mongodb.net:27017,ac-z6r2eyk-shard-00-02.tpfodys.mongodb.net:27017/fitness?ssl=true&replicaSet=atlas-10jn36-shard-0&authSource=admin&retryWrites=true&w=majority')

  .then(() => {
    console.log('Database connected');
    const server = app.listen(3000, () => {
      console.log("Server connected on port 3000");
    });

    const { Server } = require('socket.io');
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: 'http://localhost:4200',
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected to WebSocket");
      socket.on("setup",(userId)=>{
      console.log("user id in setup",userId);
      socket.join(userId);
      socket.emit("connected");
      });
      socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User Joined room:"+room);
      })
      socket.on('new message',(room,senderType)=>{
        console.log(room,senderType);
    if(!room.userId || !room.trainerId){
      return console.log('chat.users not defined')
    }
    
    if(senderType==='User'){
      socket.to(room.trainerId).emit("message received")
    }

    if(senderType==='Trainer'){
      socket.to(room.userId._id).emit("message received")
    }
      })
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  }); 
