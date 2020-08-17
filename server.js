"use strict"

const express = require('express');
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const bootcampRoutes = require('./routes/bootcampRoutes');
const courseRoutes = require('./routes/courseRoutes');
const generalRoutes = require('./routes/generalRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectToDB = require('./config/db');
const handleError = require('./utils/middlewares');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
connectToDB();

app.use(express.static(path.join(__dirname, 'images')));
app.use(fileUpload());
app.use(morgan('tiny'));//log the requests
app.use(express.json());//Body parser
app.use('/api/v1/bootcamps', bootcampRoutes);//mount routes
app.use('/api/v1/courses', courseRoutes);//mount routes
app.use('/api/v1/general', generalRoutes);
app.use(handleError);//this middleware shoube located after router middleware




app.listen(process.env.PORT || 3000, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));

//Handle unhandled promise rejection globallyy
process.on('unhandledRejection', (err, promise) => {
    console.log(promise);
    console.log(`UnhandledRejection: ${err}`);
    process.exit(1);
});


process.on('SIGTERM', signal => {
    mongoose.connection.close(() => {
        console.log('Database connection disconnected through app termination');
        console.log(`Process ${process.pid} received a SIGTERM signal`);
        process.exit(0);
    });
})

process.on('SIGINT', signal => {
    mongoose.connection.close(() => {
        console.log('Database connection disconnected through app termination');
        console.log(`Process ${process.pid} has been interrupted`);
        process.exit(0);
    });
})