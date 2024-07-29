const express = require('express')
const router = express.Router()

const {createStudent,getAllStudents} = require('../controllers/students')
//console.log(getAllStudents)
router.route('/').get(getAllStudents).post(createStudent)

module.exports = router 