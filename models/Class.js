const mongoose = require('mongoose')
const ClassSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'must provide a title'],
        trim: true,
        maxlength: [30,'title can not be more than 30 characters'],
    },
    teacher: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Teacher',
         required: true,
    }, 
    // assignments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Assignment'
    // }], 
    students: [ 
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }
        },
    ],
    course:{type: String,
        required: [true,'must provide a title'],
        trim: true,
        maxlength: [40,'title can not be more than 40 characters'],},
},{timestamps: true})

module.exports = mongoose.model('Class', ClassSchema)