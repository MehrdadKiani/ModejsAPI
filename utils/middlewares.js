"use strict";


// @desc    Log request to console
exports.logger = (req, res, next) => {
    //adding a new variable(logger for example) to request, so it will be accessible in all routes
    req.logger = 'Logger middleware added';
    console.log('Logger middleware ran!');
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`.red);;
    next();
};

//custom error handler middleware
exports.errorHandler = (err, req, res, next) => {
    //log to console for dev
    //err will comes from the next() method from controller
    //err.statusCode comes from the new extended class (errorResponseHelper class)
    console.log(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Not defined!'
    });
};