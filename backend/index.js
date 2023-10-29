const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');

// Middleware for handling CORS
app.use(cors({
  origin: 'http://localhost:4200', // Adjust the origin as needed
}));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for serving static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public'));

// Routes
const userroute = require('./routes/userRoute');
const adminroute = require('./routes/adminRoute');
const trainerroute = require('./routes/trainetRoute');

// Apply the route-specific middleware before each route
app.use('/', userroute);
app.use('/admin', adminroute);
app.use('/trainer', trainerroute);

// MongoDB Connection
mongoose.connect('mongodb+srv://mujeebrahmanps01707:ruzo4mjVv0WDCyor@cluster0.tpfodys.mongodb.net/fitness?retryWrites=true&w=majority')
  .then(() => {
    console.log('Database connected');
    // Start the server after the database is connected
    app.listen(3000, () => {
      console.log("Server connected on port 3000");
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
