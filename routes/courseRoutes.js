"use strict";

const express = require('express');
const router = express.Router({ mergeParams: true });//Express Router middleware
const { getCourses, getCourseById, createNewCourse, updateCourseById, deleteCourseById, deleteAllCourses } = require('../controllers/courseController');


router.route('/')
    .get(getCourses)
    .post(createNewCourse)
    .delete(deleteAllCourses);

router.route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById);

module.exports = router;