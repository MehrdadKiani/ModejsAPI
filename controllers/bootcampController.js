"use strict";

const BootcampModel = require('../models/Bootcamp');
const asyncHandler = require('../utils/asyncHandler');
const CustomErrorHandler = require('../utils/ErrorHandlerClass');


exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await BootcampModel.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});


exports.getBootcampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.findById(req.params.id);
    if (!bootcamp)
        throw new CustomErrorHandler(404, `Bootcamp with id ${req.params.id} not found`);
    res.status(200).json({ success: true, data: bootcamp });
});


exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
});

exports.resetData = asyncHandler(async (req, res, next) => {
    const data = [{ "name": "Devworks Bootcamp", "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer", "website": "https://devworks.com", "phone": "(111) 111-1111", "email": "enroll@devworks.com", "address": "233 Bay State Rd Boston MA 02215", "careers": ["Web Development", "UI/UX", "Business"], "housing": true, "jobAssistance": true, "jobGuarantee": false, "acceptGi": true }, { "name": "ModernTech Bootcamp", "description": "ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX", "website": "https://moderntech.com", "phone": "(222) 222-2222", "email": "enroll@moderntech.com", "address": "220 Pawtucket St, Lowell, MA 01854", "careers": ["Web Development", "UI/UX", "Mobile Development"], "housing": false, "jobAssistance": true, "jobGuarantee": false, "acceptGi": true }, { "name": "Codemasters", "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science", "website": "https://codemasters.com", "phone": "(333) 333-3333", "email": "enroll@codemasters.com", "address": "85 South Prospect Street Burlington VT 05405", "careers": ["Web Development", "Data Science", "Business"], "housing": false, "jobAssistance": false, "jobGuarantee": false, "acceptGi": false }, { "name": "Devcentral Bootcamp", "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development", "website": "https://devcentral.com", "phone": "(444) 444-4444", "email": "enroll@devcentral.com", "address": "45 Upper College Rd Kingston RI 02881", "careers": ["Mobile Development", "Web Development", "Data Science", "Business"], "housing": false, "jobAssistance": true, "jobGuarantee": true, "acceptGi": true }];
    await BootcampModel.deleteMany();
    const result = await BootcampModel.insertMany(data);
    res.status(201).json({ success: true, data: result });
});


exports.updateBootcampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bootcamp)
        throw new CustomErrorHandler(404, `Bootcamp with id ${req.params.id} not found`);
    res.status(200).json({ success: true, data: bootcamp });
});


exports.updateAllBootcamps = asyncHandler(async (req, res, next) => {
    //const bootcamp = await BootcampModel.updateMany(req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, msg: `Update all bootcamps` });
});


exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);
    if (!bootcamp)
        throw new CustomErrorHandler(404, `Bootcamp with id ${req.params.id} not found`);
    res.status(200).json({ success: true, data: bootcamp });
});


exports.deleteAllBootcamps = asyncHandler(async (req, res, next) => {
    const result = await BootcampModel.deleteMany();
    res.status(200).json({ success: true, data: result });
});