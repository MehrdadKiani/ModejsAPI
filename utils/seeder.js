const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../config/config.env' });

// Load models
const Bootcamp = require('../models/Bootcamp');
const Course = require('../models/Course');
//const User = require('./models/User');
//const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/samples/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/samples/courses.json`, 'utf-8')
);

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/samples/users.json`, 'utf-8')
// );

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/samples/reviews.json`, 'utf-8')
// );

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    //await User.create(users);
    //await Review.create(reviews);
    console.log('Data Imported...');
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    //await User.deleteMany();
    //await Review.deleteMany();
    console.log('Data Destroyed...');
  } catch (err) {
    console.error(err);
  }
};

module.exports = { importData, deleteData };