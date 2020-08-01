"use strict"

const express = require('express');
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const router = require('./routes/routes');
const morgan = require('morgan');
const connectToDB = require('./config/db');
const { errorHandler } = require('./utils/middlewares')
const app = express();


app.use(express.json());//Body parser
app.use(router);//mount routes
app.use(errorHandler);//this middleware shoube located after router middleware
app.use(morgan('tiny'));//log the requests


connectToDB();
app.listen(process.env.PORT || 3000, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));