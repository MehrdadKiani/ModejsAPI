"use strict";

// @desc    Log request to console
const logger = (req, res, next) => {
    //adding a new variable(logger for example) to request, so it will be accessible in all routes
    req.logger = 'Logger middleware added';
    console.log('Logger middleware ran!');
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`.red);;
    next();
};

//custom error handler middleware
const handleError = (err, req, res, next) => {
    console.log(err);

    let { statusCode, message } = err;

    statusCode = statusCode || 500;

    //let reason = err.reason.split('\n')[0];
    res.status(statusCode).json({
        success: false,
        message
    });
};

//
const advancedResult = (model, populate) => async (req, res, next) => {

}

module.exports = handleError, advancedResult;