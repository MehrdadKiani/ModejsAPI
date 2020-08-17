const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    weeks: {
        type: String,
        required: [true, 'Please add number of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcampId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }
});

//static function on model
//  Course.goFish()                     //define a static function
//  courseList = CourseModel.find()     //get the result of model
//  courseList.goFish                   //run static function on the result

//static mothed to get avg of course tuitions
CourseSchema.statics.getAvgCost = async function (_bootcampId) {
    const obj = await this.aggregate([
        { $match: { bootcampId: _bootcampId } },
        { $group: { _id: '$bootcampId', averageCost: { $avg: '$tuition' } } }
    ]);

    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10
        });
    } catch (err) {
        console.error(err);
    }
}

//Call getAvgCost function after save
CourseSchema.post('save', { document: true, query: false }, function () {
    //run static mothed here
    this.constructor.getAvgCost(this.bootcampId);
});

//Call getAvgCost function before remove
CourseSchema.pre('remove', { document: true, query: false }, function () {
    //run static mothed here
    this.constructor.getAvgCost(this.bootcampId);
});

//Call getAvgCost function after tuition update 
//but this refers to a query, not a document. 
//To register updateOne or deleteOne middleware as document middleware,
//use schema.pre('updateOne', { document: true, query: false }).
CourseSchema.post('updateOne', { document: true, query: false }, function () {
    this.constructor.getAvgCost(this.bootcampId);
});

module.exports = mongoose.model('Course', CourseSchema);