"use strict";

//create a custome class to extend the core Error class, then we can add status code in response
class errorResponseHelper extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
};

module.exports = errorResponseHelper;