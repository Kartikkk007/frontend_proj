const otpVerification=require('../models/otpVerification')
const otpFiles=require('./sendmail')
const resendOtp=async(req,res)=>{
    const{user_id,email}=req.body
    await otpVerification.deleteMany({userId:user_id})
    try{
    await otpFiles.sendotpEmail(req.body)
    console.log("status is okay")
    res.status(200).json({message:"otp resent successfully"})}
    catch(err){
        console.log(err)
        res.status(400).json({message:"Error sending otp"})
    }
}
module.exports={
    resendOtp,
}