const express = require('express')
const router = express.Router()

const {createAssignment,getAllAssignments,getAssignment,
	updateAssignment,
	deleteAssignment} = require('../controllers/assignments')
//console.log(getAllStudents)
router.route('/:id').get(getAllAssignments).post(createAssignment)
router.route('/:cid/:id').get(getAssignment).patch(updateAssignment)

module.exports = router 