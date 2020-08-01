"use strict"

const express = require('express');
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const router = require('./routes/routes');
const morgan = require('morgan');
const app = express();



app.use(router);
app.use(morgan('tiny'));
app.listen(process.env.PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));