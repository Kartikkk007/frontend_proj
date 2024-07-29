const express = require('express')
const router = express.Router()

const {resendOtp} = require('../controllers/resendOtp')
router.route('/').post(resendOtp)

module.exports = router 