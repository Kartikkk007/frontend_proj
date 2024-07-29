const mongoose = require('mongoose')
const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
    },
    teacherId: {
        type: String,
        unique: true,
        required: true,
    },
    department: {
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

module.exports = mongoose.model('Teacher', TeacherSchema)