const mongoose = require('mongoose')

const otpVerificationSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'docModel'
    },
    otp:{
        type:String,
        required:true,
    },
    docModel: {
        type: String,
        required: true,
        enum: ['Student', 'Teacher']
    },
    createdAt:{
        type:Date,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
});
module.exports = mongoose.model('Otp', otpVerificationSchema)