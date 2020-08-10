"use strict";

const express = require('express');
const router = express.Router();//Express Router middleware
const { resetData } = require('../controllers/generalController');

router.route('/data/reset')
    .post(resetData);

module.exports = router;