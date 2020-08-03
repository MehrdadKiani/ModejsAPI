"use strict"

const express = require('express');
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const router = require('./routes/routes');
const morgan = require('morgan');
const connectToDB = require('./config/db');
const { handleError } = require('./utils/middlewares');

const app = express();
connectToDB();


app.use(express.json());//Body parser
app.use(router);//mount routes
app.use(handleError);//this middleware shoube located after router middleware
app.use(morgan('tiny'));//log the requests


//put the server on a variable to able to close the server if needed
const server = app.listen(process.env.PORT || 3000, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));

//Handle unhandled promise rejection globallyy
process.on('unhandledRejection', (err, promise) => {
    console.log(promise);
    console.log(`UnhandledRejection: ${err}`);
    server.close(() => process.exit(1));
});