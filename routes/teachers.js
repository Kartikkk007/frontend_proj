const express = require('express')
const router = express.Router()

const {createTeacher,getAllTeachers} = require('../controllers/teachers')

router.route('/').get(getAllTeachers).post(createTeacher)

module.exports = router 