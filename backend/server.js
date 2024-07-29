const express = require('express')
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const txnRoutes = require('./routes/transac')
require('dotenv').config()

//express app
const app=express()

// const mongoose=require('mongoose')
connectDB();

// middleware
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend origin
    credentials: true,
  }));

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/txn', txnRoutes)
app.use('/api/auth', authRoutes);

// connect to db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         // listen for requests
//         app.listen(process.env. PORT, () => {
//         console.log('connected to db and listening on port', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));