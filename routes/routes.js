"use stict";

const express = require('express');
const { getAllBootcamps, getBootcampById, createNewBootcamp, updateAllBootcamps, updateBootcampById, deleteAllBootcamp, deleteBootcampById } = require('../controllers/bootcampController')

router = express.Router();

router.route('/api/v1/bootcamps/')
    .get(getAllBootcamps)
    .post(createNewBootcamp)
    .put(updateAllBootcamps)
    .delete(deleteAllBootcamp);

router.route('/api/v1/bootcamps/:id')
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById);

module.exports = router;