"use strict";

const CustomErrorHandler = require('../utils/ErrorHandlerClass');
const asyncHandler = require('../utils/asyncHandler');
const CourseModel = require('../models/Course');
const BootcampModel = require('../models/Bootcamp');


/**
 * @route       GET /api/v1/courses   (Get all courses)
 * @route       GET /api/v1/bootcamps/:bootcampId/courses   (Get all courses for a specific bootcamp)
 * @param       req.params.zipcode
 * @param       req.params.distance
 * @access      Publics
 */
exports.getCourses = asyncHandler(async (req, res, next) => {

  //GET /api/v1/bootcamps/:bootcampId/courses hit
  if (req.params.bootcampId) {
    const courses = await CourseModel.find({ bootcampId: req.params.bootcampId }).populate({ path: 'bootcamp', select: 'name avgCost' });
    return res.status(200).json({ success: true, count: courses.length, data: courses });

    //GET /api/v1/courses hit
  } else {
    //res.status(200).json(res.advancedResults);
    const courses = await CourseModel.find().populate({ path: 'bootcamp', select: 'name avgCost' });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  }
});




/**
 * @route       GET /api/v1/courses/:id
 * @param       req.params.id
 * @access      Publics
 */
exports.getCourseById = asyncHandler(async (req, res, next) => {
  const course = await CourseModel.findById(req.params.id).populate('bootcampId');

  if (!course) {
    throw new CustomErrorHandler(404, `Course with id ${req.params.id} not found`);
  };

  res.status(200).json({
    success: true,
    data: course
  });
});





/**Create a new course
 * @route       POST /api/v1/bootcamps/:bootcampId/courses
 * @param       req.params.bootcampId
 * @param       req.body
 * @access      Private
 */
exports.createNewCourse = asyncHandler(async (req, res, next) => {
  //manually assign URL param (bootcampId) to req.body
  req.body.bootcampId = req.params.bootcampId;

  const bootcamp = await BootcampModel.findById(req.params.bootcampId);
  if (!bootcamp)
    throw new CustomErrorHandler(404, `Bootcamp with id ${req.params.bootcampId} not found`);

  const course = await CourseModel.create(req.body);
  res.status(201).json({ success: true, data: course });
});




/**Update a course
 * @route       PUT /api/v1/courses/:ids
 * @param       req.params.id
 * @param       req.body
 * @access      Private
 */
exports.updateCourseById = asyncHandler(async (req, res, next) => {
  let course = await CourseModel.findById(req.params.id);
  if (!course) {
    throw new CustomErrorHandler(404, `Course with id ${req.params.id} not found`);
  }
  await course.updateOne(req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, data: course });
});




/**Delete a course
 * @route       DELETE /api/v1/courses/:id
 * @param       req.params.id
 * @access      Private
 */
exports.deleteCourseById = asyncHandler(async (req, res, next) => {
  const course = await CourseModel.findById(req.params.id);
  if (!course) {
    throw new CustomErrorHandler(404, `Course with id ${req.params.id} not found`);
  }
  await course.remove();
  res.status(200).json({ success: true, data: {} });
});


/**
 * Delete all courses
 * @route       DELETE /api/v1/courses
 * @access      Private
 */
exports.deleteAllCourses = asyncHandler(async (req, res, next) => {
  const courses = await CourseModel.remove();
  res.status(200).json({ success: true, data: courses });
});