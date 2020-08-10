"use strict";

const BootcampModel = require('../models/Bootcamp');
const asyncHandler = require('../utils/asyncHandler');
const CustomErrorHandler = require('../utils/ErrorHandlerClass');
const geocoder = require('../utils/geocoder');



/**
 * Get all bootcamps
 * @route       GET /api/v1/bootcamps
 * @access      Publics
 */
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
    let requestQuery = { ...req.query };
    let select = '';
    let sort = '';
    let limit = 10;
    let page = 1;
    let finalQuery = '';


    Object.entries(requestQuery).forEach(([key, value]) => {
        delete requestQuery['select'];
        if (key === 'select') { select = value.toString().split(',').join(' ') };

        delete requestQuery['sort'];
        if (key === 'sort') { sor = value.toString().split(',').join(' ') };

        delete requestQuery['limit'];
        if (key === 'limit') { limit = parseInt(value) };

        delete requestQuery['page'];
        if (key === 'page') { page = parseInt(value) };
    });

    const totalDocs = await BootcampModel.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    finalQuery = JSON.parse(JSON.stringify(requestQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`));
    finalQuery = BootcampModel.find(finalQuery).populate('courseList');
    finalQuery = finalQuery.select(select);
    finalQuery = finalQuery.sort(sort);
    finalQuery = finalQuery.limit(limit);
    finalQuery = finalQuery.skip(startIndex);


    //pagination
    let pagination = { limit: limit };
    if (endIndex < totalDocs) { pagination.nextPage = page + 1; }
    if (startIndex > 0 && startIndex < totalDocs) { pagination.prevPage = page - 1; }


    const bootcamps = await finalQuery;
    res.status(200).json({ success: true, count: totalDocs, pagination, data: bootcamps });
});




/**
 * Get a single bootcamp by id
 * @route       GET /api/v1/bootcamps/:id
 * @param       req.params.id
 * @access      Publics
 */
exports.getBootcampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.findById(req.params.id);
    if (!bootcamp)
        throw new CustomErrorHandler(404, `Bootcamp with id ${req.params.id} not found`);
    res.status(200).json({ success: true, data: bootcamp });
});




/**
 * Get bootcamps witin a radius
 * @route       GET /api/v1/bootcamps/:zipcode/:distance
 * @param       req.params.zipcode
 * @param       req.params.distance
 * @access      Publics
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    const loc = await geocoder.geocode(zipcode);

    //get latitude and longitude from zipcode
    const lat = loc[0].latitude;
    const lon = loc[0].longitude;

    //calc radius using radians
    //divide distance by radius of the earth
    //earth radius in km = 6,371 km
    const radius = distance / 6371;
    const bootcamps = await BootcampModel.find({
        location: { $geoWithin: { $centerSphere: [[lon, lat], radius] } }
    });

    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});




/**
 * Create a new bootcamp
 * @route       POST /api/v1/bootcamps
 * @param       req.body
 * @access      Private
 */
exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
});




/**
 * Update a single bootcamp
 * @route       PUT /api/v1/bootcamps/:id
 * @param       req.params.id
 * @param       req.body
 * @access      Private
 */
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bootcamp)
        throw new CustomErrorHandler(404, `Bootcamp with id ${req.params.id} not found`);
    res.status(200).json({ success: true, data: bootcamp });
});




/**
 * Update all bootcamps
 * @route       PUT /api/v1/bootcamps
 * @param       req.body
 * @access      Private
 */
exports.updateAllBootcamps = asyncHandler(async (req, res, next) => {
    //const bootcamp = await BootcampModel.updateMany(req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, msg: `Update all bootcamps` });
});




/**
 * Delete a single bootcamp
 * @route       DELETE /api/v1/bootcamps/:id
 * @param       req.params.id
 * @access      Private
 */
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);
    if (!bootcamp)
        throw new CustomErrorHandler(404, `Bootcamp with id ${req.params.id} not found`);
    res.status(200).json({ success: true, data: bootcamp });
});




/**
 * Delete all bootcamps
 * @route       DELETE /api/v1/bootcamps
 * @access      Private
 */
exports.deleteAllBootcamps = asyncHandler(async (req, res, next) => {
    const result = await BootcampModel.deleteMany();
    res.status(200).json({ success: true, data: result });
});