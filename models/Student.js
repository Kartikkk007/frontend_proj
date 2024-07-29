const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
    },
    rollno: {
        type: String,
        unique: true,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('Student', StudentSchema)