"use stict";

const express = require('express');
const router = express.Router();//Express Router middleware
const { getAllBootcamps,
    getBootcampById,
    createNewBootcamp,
    updateAllBootcamps,
    updateBootcampById,
    deleteAllBootcamps,
    deleteBootcampById,
    getBootcampsInRadius,
    uploadFile } = require('../controllers/bootcampController')

//include other resource routers
const courseRoutes = require('./courseRoutes');

router.route('/')
    .get(getAllBootcamps)
    .post(createNewBootcamp)
    .put(updateAllBootcamps)
    .delete(deleteAllBootcamps);

router.route('/:id')
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById);

router.route('/:id/photo')
    .put(uploadFile);

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);


//other resource routers (re-route into other resource routers)
//if the path matches, bound it to courseRoutes
//it was possible to bring getCourses function on the top of the file too
//in order for this to work, we should pass an object-{ mergeParams: true }- to courseRoutes file
router.use('/:bootcampId/courses', courseRoutes);

module.exports = router;