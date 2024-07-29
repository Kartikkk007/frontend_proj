const express = require('express')
const router = express.Router()

const {verifyOtp} = require('../controllers/otpVerification')
router.route('/').post(verifyOtp)

module.exports = router 