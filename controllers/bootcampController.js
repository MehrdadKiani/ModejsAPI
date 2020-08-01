"use strict";

const BootcampModel = require('../models/Bootcamp');


// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getAllBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await BootcampModel.find();
        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
    } catch (error) {
        next(error.message);
        res.status(400).json({ success: false });
    }
}

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcampById = async (req, res, next) => {
    try {
        const bootcamp = await BootcampModel.findById(req.params.id);
        if (!bootcamp)
            return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        return res.status(400).json({ success: false });
    }
}

// @desc    Create new bootcamps
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createNewBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await BootcampModel.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcampById = async (req, res, next) => {
    try {
        const bootcamp = await BootcampModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp)
            return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        return res.status(400).json({ success: false });
    }
}

// @desc    Update bootcamps
// @route   PUT /api/v1/bootcamps
// @access  Private
exports.updateAllBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update all bootcamps` });
}

// @desc    Delete bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcampById = async (req, res, next) => {
    try {
        const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);

        if (!bootcamp)
            return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        return res.status(400).json({ success: false });
    }
}

// @desc    Delete all bootcamps
// @route   DELETE /api/v1/bootcamps
// @access  Private
exports.deleteAllBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete all bootcamps` });
}