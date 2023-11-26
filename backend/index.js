const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');

app.use(cors({
  origin: 'http://3.111.7.219',
  credentials: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
const userroute = require('./routes/userRoute');
const adminroute = require('./routes/adminRoute');
const trainerroute = require('./routes/trainetRoute');

app.use('/api', userroute);
app.use('/api/admin', adminroute);
app.use('/api/trainer', trainerroute);

app.use(cookieParser());




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
        origin: 'http://3.111.7.219',
      },
    });

    app.use('/', express.static(path.join(__dirname, '../dist/fitness')));
    app.use('/*', express.static(path.join(__dirname, '../dist/fitness')));


    io.on("connection", (socket) => {
      console.log("Client connected to WebSocket");
      socket.on("setup", (userId) => {
        console.log("user id in setup", userId);
        socket.join(userId);
        socket.emit("connected");
        socket.broadcast.emit("online", userId)
        socket.on('disconnect', () => {
          console.log("disconnected", userId);
        socket.broadcast.emit('offline', userId)
        })
      });
      socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined room:" + room);
      })

      socket.on('typing', (roomId) => socket.to(roomId).emit('typing progress', roomId))
      socket.on('stop typing', (roomId) => socket.in(roomId).emit('stop typing'))
      socket.on('trainer typing', (roomId) => socket.to(roomId).emit('trainer typing progress', roomId))
      socket.on('trainer stop typing', (roomId) => socket.in(roomId).emit('trainer stop typing'))

      socket.on('trainer message read',(roomId)=>socket.to(roomId).emit('trainer message read success',roomId))
      socket.on('trainer message unread',(roomId,chat)=>socket.to(roomId).emit('trainer message unread success',roomId,chat))

      socket.on('message read',(roomId)=>socket.to(roomId).emit('message read success',roomId))
      socket.on('message unread',(roomId,chat)=>socket.to(roomId).emit('message unread success',roomId,chat))

      socket.on('new message', (room, senderType, chat) => {
        if (!room.userId || !room.trainerId) {
          return
        }
        if (room.userId === chat.sender) {
          socket.to(room._id).emit("message received", chat)
        }

        if (room.trainerId === chat.sender) {
          socket.to(room._id).emit("message received", chat)
        }
        socket.emit("message received", chat);
      })


    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  }); 
