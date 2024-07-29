const express = require('express')
const router = express.Router()
const validateToken = require("../middleware/validatejwt");
const {getAllClasses,getClass,createClass} = require('../controllers/classrooms')

router.use(validateToken);
router.route('/').get(getAllClasses).post(createClass)
router.route('/:id').get(getClass)

module.exports = router 