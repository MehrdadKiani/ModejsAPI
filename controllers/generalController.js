"use strict";

const asyncHandler = require('../utils/asyncHandler');
const { importData, deleteData } = require('../utils/seeder');

/**
 * Reset project data
 * @route       POST /api/v1/bootcamps/reset
 * @access      Private
 */
exports.resetData = asyncHandler(async (req, res, next) => {
    await deleteData();
    await importData();
    res.status(200).json({ success: true, data: "Data reset!" })
});