const mongoose = require('mongoose')

const AssignmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    submissions: [
        {
            _id: false,
            student: {
                type: String,
                ref: 'Student'
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ],
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    due: {
        type: Date,
        required: true,
        validate: (input) => {
            return new Date(input) > new Date();
        },
        message: 'Due date must be greater than current date'
    },
},{timestamps: true})

module.exports = mongoose.model('Assignment', AssignmentSchema)