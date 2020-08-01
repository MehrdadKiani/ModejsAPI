"use stict";

const express = require('express');
const { getAllBootcamps, getBootcampById, createNewBootcamp, updateAllBootcamps, updateBootcampById, deleteAllBootcamps, deleteBootcampById } = require('../controllers/bootcampController')

router = express.Router();//Express Router middleware

router.route('/api/v1/bootcamps/')
    .get(getAllBootcamps)
    .post(createNewBootcamp)
    .put(updateAllBootcamps)
    .delete(deleteAllBootcamps);

router.route('/api/v1/bootcamps/:id')
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById);

module.exports = router;