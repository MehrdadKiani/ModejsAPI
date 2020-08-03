"use strict";

//create a custome class to extend the core Error class, then we can add status code in response
//We need to create a custom Error constructor which extends the JavaScript Error constructor.
/**
 * @description desc
 * @type        test
 */
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ErrorHandler;