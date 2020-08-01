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

exports.resetData = async (req, res, next) => {
    const data = [{ "name": "Devworks Bootcamp", "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer", "website": "https://devworks.com", "phone": "(111) 111-1111", "email": "enroll@devworks.com", "address": "233 Bay State Rd Boston MA 02215", "careers": ["Web Development", "UI/UX", "Business"], "housing": true, "jobAssistance": true, "jobGuarantee": false, "acceptGi": true }, { "name": "ModernTech Bootcamp", "description": "ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX", "website": "https://moderntech.com", "phone": "(222) 222-2222", "email": "enroll@moderntech.com", "address": "220 Pawtucket St, Lowell, MA 01854", "careers": ["Web Development", "UI/UX", "Mobile Development"], "housing": false, "jobAssistance": true, "jobGuarantee": false, "acceptGi": true }, { "name": "Codemasters", "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science", "website": "https://codemasters.com", "phone": "(333) 333-3333", "email": "enroll@codemasters.com", "address": "85 South Prospect Street Burlington VT 05405", "careers": ["Web Development", "Data Science", "Business"], "housing": false, "jobAssistance": false, "jobGuarantee": false, "acceptGi": false }, { "name": "Devcentral Bootcamp", "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development", "website": "https://devcentral.com", "phone": "(444) 444-4444", "email": "enroll@devcentral.com", "address": "45 Upper College Rd Kingston RI 02881", "careers": ["Mobile Development", "Web Development", "Data Science", "Business"], "housing": false, "jobAssistance": true, "jobGuarantee": true, "acceptGi": true }];
    try {
        await BootcampModel.deleteMany();
        const result = await BootcampModel.insertMany(data);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        next(error);
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
exports.deleteAllBootcamps = async (req, res, next) => {
    try {
        const result = await BootcampModel.deleteMany();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}